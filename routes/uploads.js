var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');
var fs = require('fs');
var findRemoveSync = require('find-remove');
var Excel = require('exceljs');
const url = require('url');
var multiparty = require('multiparty');
const util = require('util');
var q = require('q');



router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get('/studentLab', function(req, res) {
	res.writeHead(200);
	var destinationFile = fs.createWriteStream("file.xlsx");
	req.pipe(destinationFile);

	var fileSize = req.headers['content-length'];
	var uploadedBytes = 0 ;

	req.on('data',function(d){
		uploadedBytes += d.length;
		var p = (uploadedBytes/fileSize) * 100;
		res.write("Uploading " + parseInt(p)+ " %\n");
	});

	req.on('end',function(){
		res.end("File Upload Complete");
	});

});

router.post('/labs', function(req, res) {
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
	 		jData = new Buffer(jData).toString('base64');
	 		res.end(jData);
	 		return;
		}

		var file;
		if(!files.labs_file){
			data.status = "false";
	 		data.res_code = "FILE_NOT_FOUND";

	 		var jData = JSON.stringify(data);
	 		var jData = new Buffer(jData).toString('base64');
	 		res.end(jData);
	 		return;
		}
		else{
			file = files.labs_file[0];

			if(file.originalFilename == ''){
				data.status = "false";
		 		data.res_code = "FILE_NOT_FOUND";

		 		var jData = JSON.stringify(data);
		 		var jData = new Buffer(jData).toString('base64');
		 		res.end(jData);
		 		return;
			}
		}

		var workbook = new Excel.Workbook();

		if (!fs.existsSync(process.env.REPORTS_DIR)){
		    fs.mkdirSync(process.env.REPORTS_DIR);
		}

		var fileName = "practicas.csv";

		findRemoveSync(
			process.env.REPORTS_DIR, { files: [ "practicas.csv" ] }
		);

		fs.createReadStream(file.path)
			.pipe(fs.createWriteStream(process.env.REPORTS_DIR + "/" + fileName ) );

		var query = "\
			DELETE FROM temp_labs;\
			LOAD DATA LOCAL INFILE \"" + process.env.LOCAL_REPORTS_DIR + "/" + fileName + "\"\
			INTO TABLE temp_labs\
			COLUMNS TERMINATED BY ','\
			OPTIONALLY ENCLOSED BY '\"'\
			ESCAPED BY '\"'\
			LINES TERMINATED BY '\r\n'\
			IGNORE 1 LINES;";

		var conMS = new conn.SqlConMultStat().connection;
		conMS.query(query, function(err, results) {
		
			if (err) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";
				data.res_code = "DB_EXCEPTION";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				conMS.end();
				return;
			}

			var connection = new conn.SqlConnection().connection;
			connection.connect(function(err) {
				if (err) {
					console.error('error connecting: ' + err.stack);
					data.status = "false";

					var jData = JSON.stringify(data);
					res.send(new Buffer(jData).toString('base64'));
					connection.end();
					conMS.end();
					return;
				}

				var query = "CALL uploads_labs()";

				connection.query(query, function(err, results) {
				
					if (err) {
						console.error('error query: ' + query + err.stack);
						data.status = "false";
						data.res_code = "DB_EXCEPTION";

						var jData = JSON.stringify(data);
						res.send(new Buffer(jData).toString('base64'));
						conMS.end();
						return;
					}

					data = results[0][0];
					var jData = JSON.stringify(data);
				  	res.send(new Buffer(jData).toString('base64'));
				  	conMS.end();
				  	connection.end();

				});

			});
		});
    });
});

router.post('/users', function(req, res) {
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
	 		jData = new Buffer(jData).toString('base64');
	 		res.end(jData);
	 		return;
		}

		var file;
		if(!files.users_file){
			data.status = "false";
	 		data.res_code = "FILE_NOT_FOUND";

	 		var jData = JSON.stringify(data);
	 		var jData = new Buffer(jData).toString('base64');
	 		res.end(jData);
	 		return;
		}
		else{
			file = files.users_file[0];

			if(file.originalFilename == ''){
				data.status = "false";
		 		data.res_code = "FILE_NOT_FOUND";

		 		var jData = JSON.stringify(data);
		 		var jData = new Buffer(jData).toString('base64');
		 		res.end(jData);
		 		return;
			}
		}

		var workbook = new Excel.Workbook();

		if (!fs.existsSync(process.env.REPORTS_DIR)){
		    fs.mkdirSync(process.env.REPORTS_DIR);
		}

		var fileName = "usuarios.csv";

		findRemoveSync(
			process.env.REPORTS_DIR, { files: [ "usuarios.csv" ] }
		);

		fs.createReadStream(file.path)
			.pipe(fs.createWriteStream(process.env.REPORTS_DIR + "/" + fileName ) );

		var query = "\
			DELETE FROM temp_users;\
			LOAD DATA LOCAL INFILE \"" + process.env.LOCAL_REPORTS_DIR + "/" + fileName + "\"\
			INTO TABLE temp_users\
			COLUMNS TERMINATED BY ','\
			OPTIONALLY ENCLOSED BY '\"'\
			ESCAPED BY '\"'\
			LINES TERMINATED BY '\r\n'\
			IGNORE 1 LINES;";

		var conMS = new conn.SqlConMultStat().connection;
		conMS.query(query, function(err, results) {
		
			if (err) {
				console.error('error query: ' + query + err.stack);
				data.status = "false";
				data.res_code = "DB_EXCEPTION";

				var jData = JSON.stringify(data);
				res.send(new Buffer(jData).toString('base64'));
				conMS.end();
				return;
			}

			var connection = new conn.SqlConnection().connection;
			connection.connect(function(err) {
				if (err) {
					console.error('error connecting: ' + err.stack);
					data.status = "false";

					var jData = JSON.stringify(data);
					res.send(new Buffer(jData).toString('base64'));
					connection.end();
					conMS.end();
					return;
				}

				var query = "CALL uploads_users()";

				connection.query(query, function(err, results) {
				
					if (err) {
						console.error('error query: ' + query + err.stack);
						data.status = "false";
						data.res_code = "DB_EXCEPTION";

						var jData = JSON.stringify(data);
						res.send(new Buffer(jData).toString('base64'));
						conMS.end();
						return;
					}

					data = results[0][0];
					var jData = JSON.stringify(data);
				  	res.send(new Buffer(jData).toString('base64'));
				  	conMS.end();
				  	connection.end();

				});

			});
		});
    });
});

function getWorkBook(path) {
	var workbook = new Excel.Workbook();
	var def = q.defer();

	workbook.xlsx.readFile(path)
		    .then(function() {
		    	def.resolve(workbook);
		    });

    return def.promise;
}

function query(mQuery) {
	var deferred = q.defer();
	var connection = new conn.SqlConnection().connection;
	var query = mQuery;

	connection.query(query, p , function(err, rows) {
	
		if (err || rows.length == 0) {
			console.error('error query: ' + query + err.stack);
			var data = {};
			data.status = "false";
			data.res_code = "DB_EXCEPTION";

			connection.end();
			deferred.resolve(data);
		}

		data = rows[0][0];
		deferred.resolve(data);
	  	connection.end();
	});

	return deferred.promise;
}

module.exports = router;
