var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get('/getByGroup', function(req, res) {
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
			`SELECT
				s.id,
				s.\`name\`
			FROM
				subjects s
			INNER JOIN \`subjects_class_groups\` sc ON s.id = sc.subjects_id
			WHERE
				sc.class_group_id = ?` 
		;

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

			data.data = rows;
			data.status = "true";
			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

router.get('/getByUserId', function(req, res) {
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
			`SELECT
				s.id,
				s.\`name\`
			FROM
				subjects s
			INNER JOIN \`subjects_class_groups\` sc ON s.id = sc.subjects_id
			WHERE
				sc.class_group_id IN 
				(
						SELECT
							uc.class_group_id
						FROM
							users_class_groups uc
						WHERE
							uc.users_id = ?
				)` 
		;

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

			data.data = rows;
			data.status = "true";
			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

module.exports = router;
