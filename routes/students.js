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
				u.id,
				CONCAT(u.\`name\`, ' ' ,u.last_name) as text
			FROM
				\`users\` u
			INNER JOIN users_class_groups uc ON u.id = uc.users_id
			WHERE
				uc.class_group_id = ? AND
				u.rols_id = 4` 
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

router.get('/getByLabId', function(req, res) {
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

		var queryStu = 
			`SELECT
				u.id as user_id,
				CONCAT(u.\`name\`,' ',u.last_name) as user_name
			FROM
				users u
			INNER JOIN users_class_groups uc ON u.id = uc.users_id
			WHERE
				uc.class_group_id = ? AND
				u.rols_id = 4` 
		;

		var p = [params.groupId];
		connection.query(queryStu, p , function(err, rows) {
		
			if (err) {
				console.error('error queryStu: ' + queryStu + err.stack);
				data.status = "false";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			var studRows = rows;

			var queryLab = 
				`SELECT
					l.id as lab_id, 
					l.\`name\` as lab_name, 
					DATE_FORMAT(l.delivery_date,'%d/%m/%Y') as delivery_date, 
					ls.\`name\` as less_name 
				FROM
					laboratory l
				INNER JOIN lessons ls ON l.lesson_id = ls.id
				WHERE
					l.id = ?` 
			;

			var p = [params.labId];
			connection.query(queryLab, p , function(err, rows) {
			
				if (err) {
					console.error('error queryLab: ' + queryLab + err.stack);
					data.status = "false";

					var jData = JSON.stringify(data);
					res.send(new Buffer(jData).toString('base64'));
					connection.end();
					return;
				}

				if(rows.length == 0){
					data.status = "false";
					data.excp = "Lab not found";

					var jData = JSON.stringify(data);
					res.send(new Buffer(jData).toString('base64'));
					connection.end();
					return;
				}

				var labRow = rows[0];

				var queryLabs = 
					`(
						SELECT
							u.id as user_id,
							CONCAT(u.\`name\`,' ',u.last_name) as user_name,
							l.id as lab_id,
							l.\`name\` as lab_name,
							le.\`name\` as less_name,
							DATE_FORMAT(l.delivery_date,'%Y/%m/%d') as delivery_date,
							CASE WHEN lu.state IS NULL THEN '0' ELSE lu.state END as lab_state,
							CASE WHEN lu.attempts IS NULL THEN '' ELSE lu.attempts END as lab_attempts,
							CASE WHEN lu.delivery_time IS NULL THEN '' ELSE lu.delivery_time END as lab_delivery_time,
							CASE WHEN lu.report_url IS NULL THEN '' ELSE lu.report_url END as lab_report_url,
							CASE WHEN lu.app_score IS NULL THEN '' ELSE lu.app_score END as lab_app_score,
							CASE WHEN lu.teacher_score IS NULL THEN '' ELSE lu.teacher_score END as lab_teacher_score,
							CASE WHEN lu.final_score IS NULL THEN '' ELSE lu.final_score END as lab_final_score,
							CASE WHEN lu.comments IS NULL THEN '' ELSE lu.comments END as lab_comments
						FROM
							users u
						INNER JOIN users_class_groups uc ON u.id = uc.users_id
						INNER JOIN laboratories_users lu ON u.id = lu.user_id
						INNER JOIN laboratory l ON l.id = lu.laboratory_id
						INNER JOIN lessons le ON l.lesson_id = le.id
						WHERE
							uc.class_group_id = ? AND
							u.rols_id = 4 AND
							l.id = ?
					)` 
				;

				var p = [params.groupId, params.labId];
				connection.query(queryLabs, p , function(err, rows) {
				
					if (err) {
						console.error('error queryLabs: ' + queryLabs + err.stack);
						data.status = "false";

						var jData = JSON.stringify(data);
						res.send(new Buffer(jData).toString('base64'));
						connection.end();
						return;
					}

					var labsRows = rows;

					studRows.forEach(function(e,i) {
						var isInArray = false;
						for(var i=0 ; i < rows.length ; i++){
							if(rows[i].user_id == e.user_id){
								isInArray = true;
								break;
							}
						}

						if(!isInArray){
							labsRows.push({
								user_id:e.user_id,
								user_name:e.user_name,
								lab_id:labRow.lab_is,
								lab_name:labRow.lab_name,
								less_name:labRow.less_name,
								delivery_date:labRow.delivery_date,
								lab_state:0,
								lab_attempts:"",
								lab_delivery_time:"",
								lab_report_url:"",
								lab_app_score:"",
								lab_teacher_score:"",
								lab_final_score:"",
								lab_comments:""
							});
						}
					})

					data.data = labsRows;
					data.status = "true";
					var jData = JSON.stringify(data);
					res.send(new Buffer(jData).toString('base64'));
					connection.end();
					return;

				});
			});
		});
	});
});

module.exports = router;
