var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get('/getLabsByGroSubEst', function(req, res) {
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
				l.id as lab_id,
				lu.id as lab_users_id,
				l.\`name\` as lab_name,
				l.lab_code as lab_code, 
				le.\`name\` as less_name,
				DATE_FORMAT(lu.delivery_date,'%Y/%m/%d') as delivery_date,
				CASE WHEN lu.state IS NULL THEN '0' ELSE lu.state END as lab_state,
				CASE WHEN lu.attempts IS NULL THEN '' ELSE lu.attempts END as lab_attempts,
				CASE WHEN lu.delivery_time IS NULL THEN '' ELSE lu.delivery_time END as lab_delivery_time,
				CASE WHEN lu.report_url IS NULL THEN '' ELSE lu.report_url END as lab_report_url,
				CASE WHEN lu.app_score IS NULL THEN '' ELSE lu.app_score END as lab_app_score,
				CASE WHEN lu.teacher_score IS NULL THEN '' ELSE lu.teacher_score END as lab_teacher_score,
				CASE WHEN lu.final_score IS NULL THEN '' ELSE lu.final_score END as lab_final_score,
				CASE WHEN lu.final_score IS NULL THEN '' ELSE lu.final_score END as lab_final_score,
				CASE WHEN lu.comments IS NULL THEN '' ELSE lu.comments END as lab_comments,
				CASE WHEN lu.state IS NULL THEN '' ELSE lu.state END as lab_state
			FROM
				laboratory l
			LEFT JOIN (
				SELECT
					*
				FROM
					laboratories_users
				WHERE
					user_id = ? AND
					delivery_date BETWEEN ? AND ?
			) lu ON l.id = lu.laboratory_id
			INNER JOIN lessons le ON l.lesson_id = le.id
			WHERE
				l.subject_id = ?` 
		;

		var p = [params.user_id, params.fIni, params.fFin, params.subject_id];
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

router.get('/getStudentsLabsByGroSub', function(req, res) {
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
				l.id as lab_id,
				lu.id as lab_users_id,
				l.\`name\` as lab_name,
				l.lab_code as lab_code, 
				le.\`name\` as less_name,
				DATE_FORMAT(lu.delivery_date,'%Y/%m/%d') as delivery_date,
				CASE WHEN lu.state IS NULL THEN '0' WHEN lu.state = '' THEN '0' ELSE lu.state END as lab_state,
				CASE WHEN lu.attempts IS NULL THEN '' ELSE lu.attempts END as lab_attempts,
				CASE WHEN lu.delivery_time IS NULL THEN '' ELSE lu.delivery_time END as lab_delivery_time,
				CASE WHEN lu.report_url IS NULL THEN '' ELSE lu.report_url END as lab_report_url,
				CASE WHEN lu.app_score IS NULL THEN '' ELSE lu.app_score END as lab_app_score,
				CASE WHEN lu.teacher_score IS NULL THEN '' ELSE lu.teacher_score END as lab_teacher_score,
				CASE WHEN lu.final_score IS NULL THEN '' ELSE lu.final_score END as lab_final_score,
				CASE WHEN lu.final_score IS NULL THEN '' ELSE lu.final_score END as lab_final_score,
				CASE WHEN lu.comments IS NULL THEN '' ELSE lu.comments END as lab_comments,
				CASE WHEN lu.state IS NULL THEN '' ELSE lu.state END as lab_state
			FROM
				laboratory l
			LEFT JOIN (
				SELECT
					*
				FROM
					laboratories_users
				WHERE
					user_id = ? AND
					delivery_date BETWEEN ? AND ?
			) lu ON l.id = lu.laboratory_id
			INNER JOIN lessons le ON l.lesson_id = le.id
			WHERE
				l.subject_id = ?` 
		;

		var p = [params.user_id, params.fIni, params.fFin, params.subject_id];
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

router.get('/updateLaboratory', function(req, res) {
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
			`UPDATE 
				laboratories_users
			SET
				teacher_score = ?,	
				comments = ?
			WHERE
				id = ?` 
		;

		var p = [params.teacher_score, params.comments, params.id];
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

router.get('/getStudentsLabsBySub', function(req, res) {
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
				l.id as lab_id,
				lu.id as lab_users_id,
				l.\`name\` as lab_name,
				l.lab_code as lab_code, 
				le.\`name\` as less_name,
				DATE_FORMAT(lu.delivery_date,'%Y/%m/%d') as delivery_date,
				CASE WHEN lu.state IS NULL THEN '0' ELSE lu.state END as lab_state,
				CASE WHEN lu.attempts IS NULL THEN '' ELSE lu.attempts END as lab_attempts,
				CASE WHEN lu.delivery_time IS NULL THEN '' ELSE lu.delivery_time END as lab_delivery_time,
				CASE WHEN lu.report_url IS NULL THEN '' ELSE lu.report_url END as lab_report_url,
				CASE WHEN lu.app_score IS NULL THEN '' ELSE lu.app_score END as lab_app_score,
				CASE WHEN lu.teacher_score IS NULL THEN '' ELSE lu.teacher_score END as lab_teacher_score,
				CASE WHEN lu.final_score IS NULL THEN '' ELSE lu.final_score END as lab_final_score,
				CASE WHEN lu.final_score IS NULL THEN '' ELSE lu.final_score END as lab_final_score,
				CASE WHEN lu.comments IS NULL THEN '' ELSE lu.comments END as lab_comments,
				CASE WHEN lu.state IS NULL THEN '' ELSE lu.state END as lab_state
			FROM
				laboratory l
			LEFT JOIN (
				SELECT
					*
				FROM
					laboratories_users
				WHERE
					user_id = ? AND
					delivery_date BETWEEN ? AND ?
			) lu ON l.id = lu.laboratory_id
			INNER JOIN lessons le ON l.lesson_id = le.id
			WHERE
				l.subject_id = ?` 
		;

		var p = [params.user_id, params.subject_id, params.fIni, params.fFin];
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
