#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('express:server');
var http = require('http');
var ip = require('ip');
var conn = require('../objs/SqlConnection.js');
var request = require('ajax-request');
var getmac = require('getmac');
var util = require('util');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);

  setServerIp();
  reportRanking();
}

function setServerIp() {

  getmac.getMac(function(err,macAddress){
      if (err)  {
        console.log("error getting MAC.");
      }
      console.log("My MAC: " + macAddress);

      var connection = new conn.SqlConnection().connection;
      connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }

        var query = "UPDATE app_params SET `value` = ? WHERE `name` = 'SERVER_MAC'";

        var p = [macAddress];  
        connection.query(query, p, function(err, rows) {
        
          if (err) {
            console.error('error query: ' + query + err.stack);
          }
          else{
            console.log('MAC configured.');
          }
        });
      });
  })

  var ipServer = ip.address();
  console.log("My ip: " + ipServer);
  var connection = new conn.SqlConnection().connection;
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    var query = 
      "UPDATE app_params SET `value` = ? WHERE `name` = 'SERVER_IP'";

    var p = [ipServer];  
    connection.query(query, p, function(err, rows) {
    
      if (err) {
        console.error('error query: ' + query + err.stack);
      }
      else{
        console.log('Ip configured.');
        validateLicense();
      }
    });
  });
}

function validateLicense() {
  var connection = new conn.SqlConnection().connection;
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    var query = 
        "SELECT\
        (\
          SELECT\
            `value`\
          FROM\
            app_params\
          WHERE\
            `name` = 'LICENSE'\
        ) as license,\
        (\
          SELECT\
            `value`\
          FROM\
            app_params\
          WHERE\
            `name` = 'SERVER_MAC'\
        ) as macServer";

    connection.query(query, function(err, rows) {
    
      if (err) {
        console.error('error query: ' + query + err.stack);
        return;
      }

      var license = rows[0].license;
      var macServer = rows[0].macServer;

      console.log("Validating license: " + license);

      var data = {
        status:"false",
        data:{}
      };

      request({
        url: process.env.LICENSE_SERVER,
        method: 'GET',
        data: {
          licencia: license,
          bundle_id: process.env.BUNDLE_ID,
          dispositivo_id: macServer,
          primera_vez: 'false'
        }
      }, function(er, response, body) {
        if (er) {
          console.error('Validate error');
          decreaseAttempt();
          return;
        }

        try {
          var resData = JSON.parse(body);
        } catch (e) {
          console.log("res is not JSON.");
          return;
        }

        var connection = new conn.SqlConnection().connection;
        connection.connect(function(err) {
          if (err) {
            console.error('DB: error connecting: ' + err.stack);
            connection.end();
            return;
          }

          var query = "CALL license_activate(?,?,?)";

          var p = [license, resData.message_id, resData.offline_attempts];
          connection.query(query, p , function(err, rows) {
          
            if (err) {
              console.error('error query: ' + query + err.stack);
              connection.end();
              return;
            }

            console.log("License status: " + resData.message_id);
            return;
          });
        });
      });
    });
  });
}

function decreaseAttempt() {
  var connection = new conn.SqlConnection().connection;
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    var query = "CALL decrease_attempts()";
    connection.query(query, function(err, rows) {
    
      if (err) {
        console.error('error query: ' + query + err.stack);
        return;
      }

      console.log("Attempt decreased");
    });
  });
}

function reportRanking() {
  var connection = new conn.SqlConnection().connection;
  connection.connect(function(err) {
    if (err) {
      console.error('Ranking report: error connecting: ' + err.stack);
      return;
    }

    var query = "CALL get_ranking_params()";

    connection.query(query, function(err, rows) {
    
      if (err) {
        console.error('error query: ' + query + err.stack);
        return;
      }

      var data = rows[0][0];

      var license     = data.license;
      var rankEnabled = data.rank_enabled;
      var schoolName  = data.schoolName;
      var country     = data.country;
      var city        = data.city;
      var schoolId    = data.schoolId;

      if(
        schoolName == null ||
        country == null ||
        city == null
      ){
        console.log("Parameters have not been setted");
        return;
      }

      if(license == '0' && rankEnabled == '1'){
        var connection = new conn.SqlConnection().connection;
        connection.connect(function(err) {
          if (err) {
            console.error('Ranking report: DB: error connecting: ' + err.stack);
            connection.end();
            return;
          }

          var query = "CALL get_rank_school_report()";
          connection.query(query , function(err, rows) {
          
            if (err) {
              console.error('error query: ' + query + err.stack);
              connection.end();
              return;
            }

            var d = rows[0];

            var dta = {
              METHOD:"put_ranking",
              PARAMS:{
                schoolId:schoolId,
                schoolName:schoolName,
                schoolCity:city,
                schoolCountry:country,
                students:d
              }
            };

            var jData = JSON.stringify(dta);
            jData = new Buffer(jData).toString('base64');

            request({
              url: process.env.RANKING_SERVER,
              method: 'POST',
              data: { data: jData }
            }, function(er, response, body) {
              if (er) {
                console.error('Ranking report: Ranking server error');
                return;
              }

              try {
                var resData = JSON.parse(JSON.parse(body).d);
              } catch (e) {
                console.log("Ranking report: res is not JSON.");
                return;
              }

              if(resData.RESULT.ESTADO == 'TRUE'){
                var resultado = resData.RESULT.RESULTADO;

                var query = "UPDATE\
                    app_params\
                  SET\
                    `value` = ?\
                  WHERE\
                    `name` = 'SCHOOL_ID'";

                var p = [resultado.schoolId];
                connection.query(query, p, function(err, rows) {
                
                  if (err) {
                    console.error('error query: ' + query + err.stack);
                    connection.end();
                    return;
                  }
                  console.log("Ranking report sent.");
                });
              }
              else{
                console.log("Ranking report: Ranking server res error");
                return;
              }
            });

          });
        });
      }
      else{
        console.log("license: " + license);
        console.log("rankEnabled: " + rankEnabled);
      }
    });

  });
}