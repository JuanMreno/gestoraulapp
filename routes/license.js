var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');
var fs = require('fs');
const url = require('url');
var request = require('ajax-request');
const util = require('util');

router.get('/activate', function(req, res) {
	
	var buf = Buffer.from(req.query.data, 'base64'); console.log(buf.toString());
	var params = JSON.parse(buf);

	var data = {
		status:"false",
		data:{}
	};
 
	request({
	  url: process.env.LICENSE_SERVER,
	  method: 'GET',
	  data: {
	    licencia: params.license,
	    bundle_id: process.env.BUNDLE_ID,
	    dispositivo_id: params.macServer,
	    primera_vez: params.firstTime
	  }
	}, function(er, response, body) {
		if (er) {
			console.error('error query: ' + er.stack);
			data.status = "false";

			var jData = JSON.stringify(data);
			res.send(new Buffer(jData).toString('base64'));
			return;
		}

		console.log(body);
		try {
			var resData = JSON.parse(body);
		} catch (e) {
			console.log("res is not JSON.");

			data.status = "false";
			var jData = JSON.stringify(data);
			res.send(new Buffer(jData).toString('base64'));
			return;
		}

		var connection = new conn.SqlConnection().connection;
		connection.connect(function(err) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				data.status = "false";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			var query = "CALL license_activate(?,?,?)";

			var p = [params.license, resData.message_id, resData.offline_attempts];
			connection.query(query, p , function(err, rows) {
			
				if (err) {
					console.error('error query: ' + query + err.stack);
					data.status = "false";

					var jData = JSON.stringify(data);
					res.send(new Buffer(jData).toString('base64'));
					connection.end();
					return;
				}

				data.status = "true";
				data.data = resData;

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				return;
			});
		});
	});
	//res.send(new Buffer(jData).toString('base64'));
});

router.get('/getState', function(req, res) {

	var data = {
		status:"false",
		data:{}
	};
 
	var connection = new conn.SqlConnection().connection;
	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			data.status = "false";

			var jData = JSON.stringify(data);
			res.send(new Buffer(jData).toString('base64'));
			connection.end();
			return;
		}

		var query = " SELECT\
			(\
				SELECT\
					`value`\
				FROM\
					app_params\
				WHERE\
					`name` = 'LICENSE_STATE'\
			) as license,\
			(\
				SELECT\
					`value`\
				FROM\
					app_params\
				WHERE\
					`name` = 'OFFLINE_ATTEMPTS'\
			) as offlineAttempts";

		connection.query(query , function(err, rows) {
		
			if (err) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			data.status = "true";
			data.data = rows[0];

			var jData = JSON.stringify(data);
			res.send(new Buffer(jData).toString('base64'));
			return;
		});
	});

	//res.send(new Buffer(jData).toString('base64'));
});


module.exports = router;