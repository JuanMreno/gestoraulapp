var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');
var fs = require('fs');
var Excel = require('exceljs');
const url = require('url');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get('/put_lab', function(req, res) {
	var buf = Buffer.from(req.query.data, 'base64');
	var params = JSON.parse(buf);

	var data = {
		status:"",
		data:{}
	};

	var connection = new conn.SqlConnection().connection;
	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			data.status = "false";
			data.res_code = "DB_CONNECTION_FAILED";

			var jData = JSON.stringify(data);
			res.send(new Buffer(jData).toString('base64'));
			connection.end();
			return;
		}

		var query = "CALL put_lab(?,?,?,?,?,?)";

		var p = [params.userName, params.labCode, params.attempts, params.delivery_date, params.delivery_time, params.app_score];
		connection.query(query, p , function(err, rows) {
		
			if (err || rows.length == 0) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";
				data.res_code = "DB_EXCEPTION";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			data.status = "true";
			data.res_code = "STATUS_OK";
			data.data = rows[0][0];

			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

module.exports = router;