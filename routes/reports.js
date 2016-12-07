var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');
var fs = require('fs');
var Excel = require('exceljs');
const url = require('url');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get('/getTeacher', function(req, res) {
	var data = JSON.parse(unescape(req.query.data));
	var templFile = process.env.REPORTS_DIR + "/report_template.xlsx";

	var workbook = new Excel.Workbook();

	workbook.creator = 'GestorApp';
	workbook.lastModifiedBy = 'GestorApp';
	workbook.created = new Date();
	workbook.modified = new Date();
	workbook.lastPrinted = new Date();

	workbook.views = [
	  {
	    x: 0, y: 0, width: 10000, height: 20000, 
	    firstSheet: 0, activeTab: 1, visibility: 'visible'
	  }
	];

	var sheet = workbook.addWorksheet('Reporte');

	sheet.addRow(['Reporte de notas']);
	sheet.addRow(['Nombre',decode(data.stuName)]);
	sheet.addRow(['Grupo',decode(data.group)]);
	sheet.addRow(['Periodo', decode(data.fIni + ' a ' + data.fFin)]);
	sheet.addRow(['Materia',decode(data.subject)]);
	sheet.addRow(['Avance',decode(data.avanInd)]);
	sheet.addRow(['Promedio',decode(data.promInd)]);
	sheet.addRow([]);
	sheet.addRow([]);
	sheet.addRow(["Nombre","Unidad","Fecha","Estado","Tiempo entrega","Intentos","N. Profesor","N. Lab","N. Final"]);

	sheet.getRow(1).font = { size: 15, bold: true };
	for(var i=2 ; i<8 ; i++){
		sheet.getRow(i).font = { size: 14, bold: true };
	}
	sheet.getRow(10).font = { size: 13, bold: true };

	var rows = data.rows;
	rows.forEach(function(e,i) {
		var estado = (e.lab_state == "1") ? "Entregado" : "Pendiente";
		var name = "";
		if(data.type == 'lab') 
			name = e.user_name;
		else
			name = e.lab_name;

		sheet.addRow([
				decode(name),
				decode(e.less_name),
				decode(e.delivery_date),
				decode(estado),
				decode(e.lab_delivery_time),
				decode(e.lab_attempts),
				decode(e.lab_teacher_score),
				decode(e.lab_app_score),
				decode(e.lab_final_score),
			]);
	});

	sheet.addRow([]);
	sheet.getColumn('A').width = 27;
	sheet.getColumn('B').width = 33;
	sheet.getColumn('C').width = 12;
	sheet.getColumn('D').width = 10;
	sheet.getColumn('E').width = 17;
	sheet.getColumn('F').width = 10;
	sheet.getColumn('G').width = 13;
	sheet.getColumn('H').width = 9;
	sheet.getColumn('I').width = 10;

	res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8');
	res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
	workbook.xlsx.write(res, "utf8")
	.then(function(){
		res.end();
	});
	/*
	workbook.xlsx.readFile(templFile)
    .then(function() {
    	
        workbook.creator = 'GestorApp';
		workbook.lastModifiedBy = 'GestorApp';
		workbook.created = new Date();
		workbook.modified = new Date();
		workbook.lastPrinted = new Date();

		workbook.views = [
		  {
		    x: 0, y: 0, width: 10000, height: 20000, 
		    firstSheet: 0, activeTab: 1, visibility: 'visible'
		  }
		];
		

		//var sheet = workbook.addWorksheet('Reporte');
		var sheet = workbook.getWorksheet(1);

		sheet.addRow(['Reporte de notas']);
		sheet.addRow(['Nombre',decode(data.stuName)]);
		sheet.addRow(['Grupo',decode(data.group)]);
		sheet.addRow(['Periodo', decode(data.fIni + ' a ' + data.fFin)]);
		sheet.addRow(['Materia',decode(data.subject)]);
		sheet.addRow(['Avance',decode(data.avanInd)]);
		sheet.addRow(['Promedio',decode(data.promInd)]);
		sheet.addRow([]);
		sheet.addRow([]);
		sheet.addRow(["Nombre","Unidad","Fecha","Estado","Tiempo entrega","Intentos","N. Profesor","N. Lab","N. Final"]);

		sheet.getRow(1).font = { size: 15, bold: true };
		for(var i=2 ; i<8 ; i++){
			sheet.getRow(i).font = { size: 14, bold: true };
		}
		sheet.getRow(10).font = { size: 13, bold: true };

		var rows = data.rows;
		rows.forEach(function(e,i) {
			var estado = (e.lab_state == "1") ? "Entregado" : "Pendiente";
			var name = "";
			if(data.type == 'lab') 
				name = e.user_name;
			else
				name = e.lab_name;

			sheet.addRow([
					decode(name),
					decode(e.less_name),
					decode(e.delivery_date),
					decode(estado),
					decode(e.lab_delivery_time),
					decode(e.lab_attempts),
					decode(e.lab_teacher_score),
					decode(e.lab_app_score),
					decode(e.lab_final_score),
				]);
		});

		sheet.getColumn('A').width = 27;
		sheet.getColumn('B').width = 33;
		sheet.getColumn('C').width = 12;
		sheet.getColumn('D').width = 10;
		sheet.getColumn('E').width = 17;
		sheet.getColumn('F').width = 10;
		sheet.getColumn('G').width = 13;
		sheet.getColumn('H').width = 9;
		sheet.getColumn('I').width = 10;

		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8');
		res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
		workbook.xlsx.write(res, "utf8")
		.then(function(){
			res.end();
		});
    });
    */
});

router.get('/getStudent', function(req, res) {
	var data = JSON.parse(unescape(req.query.data));

	var workbook = new Excel.Workbook();

	workbook.creator = 'GestorApp';
	workbook.lastModifiedBy = 'GestorApp';
	workbook.created = new Date();
	workbook.modified = new Date();
	workbook.lastPrinted = new Date();

	workbook.views = [
	  {
	    x: 0, y: 0, width: 10000, height: 20000, 
	    firstSheet: 0, activeTab: 1, visibility: 'visible'
	  }
	];

	var sheet = workbook.addWorksheet('Reporte');

	sheet.addRow([]);
	sheet.addRow(['Reporte de notas']);
	sheet.addRow(['Periodo', decode(data.fIni + ' a ' + data.fFin)]);
	sheet.addRow(['Materia',decode(data.subject)]);
	sheet.addRow([]);
	sheet.addRow([]);
	sheet.addRow(["Práctica","Unidad","Fecha","Estado","N. Profesor","N. Lab","N. Final"]);

	sheet.getRow(1).font = { size: 15, bold: true };
	sheet.getRow(2).font = { size: 13, bold: true };
	sheet.getRow(3).font = { size: 13, bold: true };
	sheet.getRow(6).font = { size: 12, bold: true };

	var rows = data.rows;
	rows.forEach(function(e,i) {
		var estado = (e.lab_state == "1") ? "Entregado" : "Pendiente";

		sheet.addRow([
				decode(e.lab_name),
				decode(e.less_name),
				decode(e.delivery_date),
				decode(estado),
				decode(e.lab_teacher_score),
				decode(e.lab_app_score),
				decode(e.lab_final_score),
			]);
	});

	sheet.getColumn('A').width = 27;
	sheet.getColumn('B').width = 33;
	sheet.getColumn('C').width = 12;
	sheet.getColumn('D').width = 10;
	sheet.getColumn('E').width = 17;
	sheet.getColumn('F').width = 10;
	sheet.getColumn('G').width = 13;

	res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8');
	res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
	workbook.xlsx.write(res, "utf8")
	.then(function(){
		res.end();
	});


});

function decode(str) {
	if(str == null)
		return "";
	return str
		.replace("Ã¡","á")
		.replace("Ã©","é")
		.replace("Ã­","í")
		.replace("Ã³","ó")
		.replace("Ãº","ú")
		.replace("Ã","Á")
		.replace("Ã‰","É")
		.replace("Ã","Í")
		.replace("Ã“","Ó")
		.replace("Ãš","Ú")
		.replace("ñ","Ã±");
}

module.exports = router;