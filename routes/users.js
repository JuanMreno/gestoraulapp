var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/getAll', function(req, res) {
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

		if(params.rolId == 4){
			var query = 
				"SELECT\
					u.id,\
					u.`name`,\
					u.last_name,\
					r.rol,\
					uc.class_group_id\
				FROM\
					users u\
				INNER JOIN rols r ON u.rols_id = r.id\
				LEFT JOIN users_class_groups uc ON u.id = uc.users_id\
				WHERE\
					r.id = ?"
			;
			var p = [params.rolId];
		}
		else{
			var query = 
				"SELECT\
					u.id,\
					u.`name`,\
					u.last_name,\
					r.rol\
				FROM\
					users u\
				INNER JOIN rols r ON u.rols_id = r.id\
				WHERE\
					r.id = ?"
			;
			var p = [params.rolId];
		}
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

router.get('/asignUser', function(req, res) {
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

		if(params.asignado == 0){
			var query = "CALL groups_asign_user(?,?)";
			var p = [ params.userId, params.groupId ];
		}
		else{
			var query = 
				`INSERT INTO users_class_groups 
				(
					users_id, 
					class_group_id
				) 
					SELECT
						*
					FROM
						(
							SELECT
								? AS users_id,
								? AS class_group_id
						) AS tmp
					WHERE
						NOT EXISTS (
							SELECT
								*
							FROM
								users_class_groups
							WHERE
								users_id = ? AND
								class_group_id = ?
					)
				LIMIT 1;`;
			var p = [params.userId, params.groupId, params.userId, params.groupId];
		}

		
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

router.get('/edit', function(req, res) {
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

		var query = "CALL users_edit(?,?,?)";

		var p = [params.id, params.name, params.last_name];
		connection.query(query, p, function(err, rows) {
		
			if (err) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			var d = rows[0][0];

			if(d.state == "REPEATED"){
				data.data = d;
				data.status = "false";
			}
			else{
				data.data = d;
				data.status = "true";
			}
			
			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

router.get('/resetPass', function(req, res) {
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

		var query = "\
			UPDATE\
				users\
			SET \
				pass = ?\
			WHERE\
				id = ?";

		var p = [params.pass, params.id];
		connection.query(query, p, function(err, rows) {
		
			if (err) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			var d = rows

			if(d.affectedRows > 0){
				data.data = d;
				data.status = "true";
			}
			else{
				data.data = {};
				data.status = "false";
			}
			
			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

router.get('/insert', function(req, res) {
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

		var query = "CALL users_insert(?,?,?)";

		var p = [params.name, params.last_name, params.rolId];
		connection.query(query, p, function(err, rows) {
		
			if (err) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			var d = rows[0][0];

			if(d.state == "REPEATED"){
				data.data = d;
				data.status = "false";
			}
			else{
				data.data = d;
				data.status = "true";
			}

			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

router.get('/asignStudUser', function(req, res) {
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

		var query = "CALL users_assign_stud(?,?)";
		var p = [ params.userId, params.groupId ];
		
		connection.query(query, p , function(err, rows) {
		
			if (err) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			//data.data = rows;
			data.status = "true";
			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

module.exports = router;
