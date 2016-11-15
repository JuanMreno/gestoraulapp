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

		console.log(file.path);
		var rowBase = ["Nombre", "Unidad", "Materia", "Codigo"];
		
		workbook.xlsx.readFile(file.path)
		    .then(function() {
		    	data.status = "false";
			 		data.res_code = "EXCEL_ERROR";

			 		var jData = JSON.stringify(data);
			 		var jData = new Buffer(jData).toString('base64');
			 		res.end(jData);
			 		return;	
				function ExcelFormatError() {};
	    		try{
			    	var worksheet = workbook.getWorksheet('Practicas');

			    	worksheet.eachRow(function(row, rowNumber) {
					    console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
					    console.log('Res: ' + JSON.stringify(r));

			    		if(rowNumber == 1 && row.values !== rowBase)
			    			throw ExcelFormatError;

			    		if(row.values.length != 4)
			    			throw ExcelFormatError;

			    		var p = [
		    				row.getCell(0).value,
		    				row.getCell(1).value,
		    				row.getCell(2).value,
		    				row.getCell(3).value
	    				];
		    			var r = query("CALL laboratories_validate(?,?,?,?)",p);

					});
				}
				catch(e){
					if(e instanceof ExcelFormatError){
						data.res_code = "FORMAT_EXCEL_ERROR";
					}
					else{
						data.res_code = "EXCEL_ERROR";
					}

					data.status = "false";
			 		data.res_code = "EXCEL_ERROR";

			 		var jData = JSON.stringify(data);
			 		var jData = new Buffer(jData).toString('base64');
			 		res.end(jData);
			 		return;			
				}
		    });
		
		/*
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
		*/
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
