var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get('/getByUser', function(req, res) {
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

		var query = "CALL get_rank_grp_by_stud(?)";

		var p = [params.userId];
		connection.query(query, p , function(err, rows) {
		
			if (err) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			data.data = rows[0];
			data.status = "true";
			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

router.get('/getByGrp', function(req, res) {
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

		var query = "CALL get_rank_grp_by_grp(?)";

		var p = [params.groupId];
		connection.query(query, p , function(err, rows) {
		
			if (err) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			data.data = rows[0];
			data.status = "true";
			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});


module.exports = router;
