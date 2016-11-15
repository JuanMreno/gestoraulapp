var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/getByGroupId', function(req, res) {
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

		/*
		var query = 
			`SELECT
				s.id,
				s.\`name\`
			FROM
				subjects s
			INNER JOIN \`subjects_class_groups\` sc ON s.id = sc.subjects_id
			WHERE
				sc.class_group_id = ?` 
		;*/
		var query =
			"SELECT\
				s.id,\
				s.`name`,\
				CASE WHEN scg.id IS NOT NULL THEN 1 ELSE 0 END as asignado\
			FROM\
				subjects s\
			LEFT JOIN (\
				SELECT\
					*\
				FROM\
					subjects_class_groups\
				WHERE\
					class_group_id = ?\
			) scg ON s.id = scg.subjects_id";

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

		/*
		var query = 
			`SELECT
				s.id,
				s.\`name\`
			FROM
				subjects s
			INNER JOIN \`subjects_class_groups\` sc ON s.id = sc.subjects_id
			WHERE
				sc.class_group_id = ?` 
		;*/
		var query =
			"SELECT\
				s.id,\
				s.`name`\
			FROM\
				subjects s\
			INNER JOIN `subjects_class_groups` sc ON s.id = sc.subjects_id\
			INNER JOIN user_group_subjects ugs ON sc.id = ugs.sc_id\
			INNER JOIN users_class_groups uc ON ugs.ucg_id = uc.id\
			WHERE\
				uc.class_group_id = ? AND\
				uc.users_id = ? AND\
				sc.class_group_id = ?";

		var p = [params.groupId, params.userId, params.groupId];
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

router.get('/getByUserGroup', function(req, res) {
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
			"SELECT\
				s.id,\
				sc.id as sc_id,\
				s.`name`,\
				CASE WHEN ugs.ucg_id = ? THEN 1 ELSE 0 END as asignado\
			FROM\
				subjects_class_groups sc\
			INNER JOIN subjects s ON s.id = sc.subjects_id \
			LEFT JOIN user_group_subjects ugs ON sc.id = ugs.sc_id\
			WHERE\
				sc.class_group_id = ? AND\
				(\
					ugs.ucg_id = ? OR\
					ugs.ucg_id IS NULL\
				)" 
		;

		var p = [params.userGroupId, params.groupId, params.userGroupId];
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

router.get('/assignUserSubject', function(req, res) {
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
			var query = 
				`DELETE FROM
					user_group_subjects
				WHERE
					ucg_id = ? AND
					sc_id = ?`;
			var p = [params.userGroupId, params.scId];
		}
		else{
			var query = 
				"INSERT INTO\
					user_group_subjects\
				(\
					ucg_id,\
					sc_id\
				)\
				SELECT * FROM (SELECT ?, ?) AS tmp\
				WHERE NOT EXISTS (\
					SELECT\
						ugs.*\
					FROM\
						user_group_subjects ugs\
					WHERE\
						ugs.ucg_id = ? AND\
						ugs.sc_id = ?\
				) LIMIT 1;" 
			;
			var p = [params.userGroupId, params.scId, params.userGroupId, params.scId];
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

router.get('/assignGroupSubject', function(req, res) {
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
			var query = "CALL subjects_d_grp_sub(?,?)";
			var p = [params.groupId, params.subjectId];
		}
		else{
			var query = 
				"INSERT INTO\
					subjects_class_groups\
				(\
					class_group_id,\
					subjects_id\
				)\
				VALUES\
				(\
					?,\
					?\
				)";
			var p = [params.groupId, params.subjectId];
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

		var query = 
			"\
			SELECT\
				s.id,\
				s.`name`\
			FROM\
				subjects s" 
		;

		//var p = [];
		connection.query(query , function(err, rows) {
		
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

		var query = "CALL subjects_edit(?,?)";

		var p = [params.subId, params.name];
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

		var query = "CALL subjects_insert(?)";

		var p = [params.name];
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

module.exports = router;
