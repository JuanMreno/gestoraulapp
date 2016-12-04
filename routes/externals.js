var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');
var fs = require('fs');
var findRemoveSync = require('find-remove');
var Excel = require('exceljs');
const url = require('url');
var multiparty = require('multiparty');
const util = require('util');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/login', function(req, res) {
	var buf = Buffer.from(req.query.data, 'base64');
	var params = JSON.parse(buf);

	var data = {
		status:"true",
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

		var query = "CALL external_login(?,?)";

		var p = [params.user, params.pass];
		connection.query(query, p, function(err, rows) {
		
			if (err || rows.length == 0) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";
				data.res_code = "DB_EXCEPTION";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			data = rows[0][0];
			var jData = JSON.stringify(data);

			console.log(jData);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

router.get('/get_lab', function(req, res) {
	var buf = Buffer.from(req.query.data, 'base64');
	var params = JSON.parse(buf);

	var data = {
		status:"true",
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

		var query = "CALL external_get_lab(?,?)";

		var p = [params.user, params.labCode];
		connection.query(query, p, function(err, rows) {
		
			if (err || rows.length == 0) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";
				data.res_code = "DB_EXCEPTION";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				connection.end();
				return;
			}

			data = rows[0][0];
			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
	});
});

router.post('/put_lab', function(req, res) {
	var data = {
		status:"",
		res_code:""
	};

	var form = new multiparty.Form();

 	form.parse(req, function(err, fields, files) {
		if(err){
			data.status = "false";
	 		data.res_code = "ERROR";

	 		var jData = JSON.stringify(data);
	 		var jData = new Buffer(jData).toString('base64');
	 		res.end(jData);
	 		return;
		}

		var params;
		if(!fields.data){
			data.status = "false";
	 		data.res_code = "DATA_NOT_FOUND";

	 		var jData = JSON.stringify(data);
	 		var jData = new Buffer(jData).toString('base64');
	 		res.end(jData);
	 		return;
		}
		else{
			try{
				//var buf = Buffer.from(fields.data[0], 'base64');
				params = JSON.parse(fields.data[0]);
			}
			catch(e){
				data.status = "false";
		 		data.res_code = "WRONG_DATA_FORMAT";

		 		var jData = JSON.stringify(data);
		 		var jData = new Buffer(jData).toString('base64');
		 		res.end(jData);
		 		return;
			}
		}

		var file;
		if(!files.report_file){
			data.status = "false";
	 		data.res_code = "FILE_NOT_FOUND";

	 		var jData = JSON.stringify(data);
	 		var jData = new Buffer(jData).toString('base64');
	 		res.end(jData);
	 		return;
		}
		else{
			file = files.report_file[0];

			if(file.originalFilename == ''){
				data.status = "false";
		 		data.res_code = "FILE_NOT_FOUND";

		 		var jData = JSON.stringify(data);
		 		var jData = new Buffer(jData).toString('base64');
		 		res.end(jData);
		 		return;
			}
		}

		var connection = new conn.SqlConnection().connection;
		var query = "CALL external_put_lab(?,?,?,?,?,?,?)";
		var fileExt = "." + file.path.split('.').pop();

		var p = [params.user, params.labCode, params.attempts, params.delivery_date, params.delivery_time, params.app_score, fileExt];
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

			data = rows[0][0];

			if(data.res_code == "LAB_INSERTED" || data.res_code == "LAB_UPDATED"){
				try{
					var labUserId = rows[1][0].labUserId;
					if (!fs.existsSync(process.env.REPORTS_DIR)){
					    fs.mkdirSync(process.env.REPORTS_DIR);
					}

					var fileName = labUserId + "_" + params.labCode + "." + file.path.split('.').pop();

					findRemoveSync(
						process.env.REPORTS_DIR, 
						{
							files: [
								labUserId + "_" + params.labCode + ".xlsx",
								labUserId + "_" + params.labCode + ".xls",
								labUserId + "_" + params.labCode + ".docx",
								labUserId + "_" + params.labCode + ".doc",
								labUserId + "_" + params.labCode + ".pdf",
								labUserId + "_" + params.labCode + ".jpg"
							]
						}
					);

					fs.createReadStream(file.path)
						.pipe(fs.createWriteStream(process.env.REPORTS_DIR + "/" + fileName ) );
				}
				catch(e){
					data.status = "false";
					data.res_code = "FILE_ERROR";

					var jData = JSON.stringify(data);
					res.send(new Buffer(jData).toString('base64'));
					connection.end();
					return;
				}
			}

			var jData = JSON.stringify(data);
		  	res.send(new Buffer(jData).toString('base64'));
		  	connection.end();
		});
    });
});

router.get('/validate', function(req, res) {

	var data = {
		status:"true",
		data:{}
	};

	var jData = JSON.stringify(data);

	console.log(jData);
  	res.send(jData);
  	connection.end();
});

module.exports = router;