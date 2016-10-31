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

		var query = 
			`SELECT
				@rownum:=@rownum-1 AS rank,
				user_id,
				CONCAT(u.\`name\`, ' ', u.last_name) as \`name\`,
				lab_qual_score,
				lab_num_score,
				tab_t_wasted_score,
				total_score
			FROM
				(SELECT @rownum:=(SELECT COUNT(*) + 1 FROM ranking)) r, ranking ra
			INNER JOIN users u ON ra.user_id = u.id
			ORDER BY
				total_score DESC` 
		;

		var p = [params.userGroupId];
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
