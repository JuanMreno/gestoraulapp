var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');
var fs = require('fs');

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

module.exports = router;
