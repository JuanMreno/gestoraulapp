var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
	var buf = Buffer.from(req.query.data, 'base64');
	var params = JSON.parse(buf);

	var data = {
		status:"OK",
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

		var query = 
			"SELECT " +
			"	u.id, " +
			"	u.`name`, " +
			"	u.last_name, " +
			"	r.rol, " +
			"	r.rol_name, " +
			"	u.rols_id " +
			"FROM " + 
			"	users u " + 
			"INNER JOIN ROLS r ON u.rols_id = r.id " +
			"WHERE " +
			"	u.`user` = '" + params.user + "' AND " +
			"	u.pass = '" + params.pass + "'";

		connection.query(query, function(err, rows) {
		
			if (err) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			data.data = rows;
			data.status = "true";
			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

module.exports = router;
