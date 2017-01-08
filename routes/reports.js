var express = require('express');
var router = express.Router();
var conn = require('../objs/SqlConnection.js');
var fs = require('fs');
var Excel = require('exceljs');
const url = require('url');
var util = require('util');

var locale = JSON.parse(fs.readFileSync( process.env.ABS_LOCALES_DIR + '/' + process.env.LOCALE_FILE, 'utf8'));
//console.log(util.inspect(locale));

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

	var sheet = workbook.addWorksheet(locale.reports_report);

	sheet.addRow([locale.reports_label_1]);
	sheet.addRow([locale.reports_label_2,decode(data.stuName)]);
	sheet.addRow([locale.reports_label_3,decode(data.group)]);
	sheet.addRow([locale.reports_label_4, decode(data.fIni + ' a ' + data.fFin)]);
	sheet.addRow([locale.reports_label_5,decode(data.subject)]);
	sheet.addRow([locale.reports_label_6,decode(data.avanInd)]);
	sheet.addRow([locale.reports_label_7,decode(data.promInd)]);
	sheet.addRow([]);
	sheet.addRow([]);
	sheet.addRow(
		[
			locale.reports_label_8,
			locale.reports_label_9,
			locale.reports_label_10,
			locale.reports_label_11,
			locale.reports_label_12,
			locale.reports_label_13,
			locale.reports_label_14,
			locale.reports_label_15,
			locale.reports_label_16
		]
	);

	sheet.getRow(1).font = { size: 15, bold: true };
	for(var i=2 ; i<8 ; i++){
		sheet.getRow(i).font = { size: 14, bold: true };
	}
	sheet.getRow(10).font = { size: 13, bold: true };

	var rows = data.rows;
	rows.forEach(function(e,i) {
		var estado = (e.lab_state == "1") ? locale.reports_label_17 : locale.reports_label_18;
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

	var sheet = workbook.addWorksheet(locale.reports_report);

	sheet.addRow([]);
	sheet.addRow([locale.reports_label_1]);
	sheet.addRow([locale.reports_label_4, decode(data.fIni + ' a ' + data.fFin)]);
	sheet.addRow([locale.reports_label_5,decode(data.subject)]);
	sheet.addRow([]);
	sheet.addRow([]);
	sheet.addRow(
		[
			locale.reports_label_19,
			locale.reports_label_9,
			locale.reports_label_10,
			locale.reports_label_11,
			locale.reports_label_14,
			locale.reports_label_15,
			locale.reports_label_16
		]
	);

	for(var i=1 ; i<8 ; i++){
		sheet.getRow(i).font = { size: 14, bold: true };
	}

	var rows = data.rows;
	rows.forEach(function(e,i) {
		var estado = (e.lab_state == "1") ? locale.reports_label_17 : locale.reports_label_18;

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

router.get('/makeStudentReport', function(req, res) {
	var data = JSON.parse(unescape(req.query.data));

	//////////////		PDFMAKE  	///////////////////////////

	var pdfStyles = {
			watermark: {
				margin: [0, 0, 0, 0]
			},
		header: {
			fontSize: 20,
			bold: true,
			margin: [0, 20, 0, 25]
		},
		subheader: {
			fontSize: 13,
			bold: false,
			margin: [0, 0, 0, 2]
		},
		tableExample: {
			margin: [0, 0, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	};

	var pdfHeaderObj = {
		columns: [
			{
				alignment: 'center',
				image: 'data:image/png;base64,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'
				//fontSize: 40,

			},
			{
				alignment: 'right',
				image: 'data:image/png;base64,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'
			}
		],
		style: 'watermark'
	};


	var fonts = {
		Roboto: {
			normal: process.env.ABS_FONTS_DIR + '/Roboto-Regular.ttf',
			bold: process.env.ABS_FONTS_DIR + '/Roboto-Medium.ttf',
			italics: process.env.ABS_FONTS_DIR + '/Roboto-Italic.ttf',
			bolditalics: process.env.ABS_FONTS_DIR + '/Roboto-Italic.ttf'
		}
	};

	var PdfPrinter = require('pdfmake/src/printer');
	var printer = new PdfPrinter(fonts);
		
	////////////////////////////////////////////////////////////

	var b = [];
  	var header = [
  		{ text: locale.reports_label_19, style: 'tableHeader', alignment: 'center' }, 
  		{ text: locale.reports_label_9, style: 'tableHeader', alignment: 'center' }, 
  		{ text: locale.reports_label_10, style: 'tableHeader', alignment: 'center' }, 
  		{ text: locale.reports_label_11, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_14, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_15, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_16, style: 'tableHeader', alignment: 'center' }
	];

	b.push(header);

	data.rows.forEach(function(e,i,a){
		var estado = (e.lab_state == "1") ? locale.reports_label_17 : locale.reports_label_18;
		b.push(
			[
				e.lab_name,
				e.less_name,
				e.delivery_date,
				estado,
				e.lab_teacher_score,
				e.lab_app_score,
				e.lab_final_score,
			]
		);
 	});
	//.push(bodyData);

	var docDefinition = {
	  content: [
		pdfHeaderObj,
	  	{ text: locale.reports_label_1, style: 'header' },
	  	{ text: locale.reports_label_8 + ': ' + data.name, style: 'subheader' },
	  	{ text: locale.reports_label_10 + ': ' + data.date, style: 'subheader' },
	  	//{ text: 'Grupo: ' + data.group, style: 'subheader' },
	  	{ text: locale.reports_label_5 + ': ' + data.subject, style: 'subheader' },
	    {
    		style: 'tableExample',
			table: {
			// headers are automatically repeated if the table spans over multiple pages
			// you can declare how many rows should be treated as headers
				headerRows: 1,
				widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
				body: b
			}
	    }
	  ],
	  styles:pdfStyles,
	  pageSize: 'FOLIO',
	  pageOrientation: 'landscape'
	};

	printer = new PdfPrinter(fonts);
	var pdfDoc = printer.createPdfKitDocument(docDefinition);

	if (!fs.existsSync(process.env.ABS_PDF_REPORTS_DIR)){
	    fs.mkdirSync(process.env.ABS_PDF_REPORTS_DIR);
	}

	var fileName = new Date().getTime().toString() + ".pdf";
	pdfDoc.pipe(fs.createWriteStream(process.env.ABS_PDF_REPORTS_DIR + '/' + fileName));
	pdfDoc.end();

	var data = {
		state:"true",
		url:""
	};

	data.url = process.env.REL_PDF_REPORTS_DIR + '/' + fileName; 
	var jData = JSON.stringify(data);
	res.end(jData);
  	//res.end();
});

router.get('/makeLabReport', function(req, res) {
	console.log(unescape(req.query.data));
	var data = JSON.parse(unescape(req.query.data));

	//////////////		PDFMAKE  	///////////////////////////

	var pdfStyles = {
			watermark: {
				margin: [0, 0, 0, 0]
			},
		header: {
			fontSize: 20,
			bold: true,
			margin: [0, 20, 0, 25]
		},
		subheader: {
			fontSize: 13,
			bold: false,
			margin: [0, 0, 0, 2]
		},
		tableExample: {
			margin: [0, 0, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	};

	var pdfHeaderObj = {
		columns: [
			{
				alignment: 'center',
				image: 'data:image/png;base64,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'
				//fontSize: 40,

			},
			{
				alignment: 'right',
				image: 'data:image/png;base64,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'
			}
		],
		style: 'watermark'
	};

	var fonts = {
		Roboto: {
			normal: process.env.ABS_FONTS_DIR + '/Roboto-Regular.ttf',
			bold: process.env.ABS_FONTS_DIR + '/Roboto-Medium.ttf',
			italics: process.env.ABS_FONTS_DIR + '/Roboto-Italic.ttf',
			bolditalics: process.env.ABS_FONTS_DIR + '/Roboto-Italic.ttf'
		}
	};
	var PdfPrinter = require('pdfmake/src/printer');
	var printer = new PdfPrinter(fonts);
		
	////////////////////////////////////////////////////////////

	var b = [];
  	var header = [
  		{ text: locale.reports_label_19, style: 'tableHeader', alignment: 'center' }, 
  		{ text: locale.reports_label_10, style: 'tableHeader', alignment: 'center' }, 
  		{ text: locale.reports_label_11, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_12, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_13, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_14, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_15, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_16, style: 'tableHeader', alignment: 'center' }
	];

	b.push(header);

	data.rows.forEach(function(e,i,a){
		var estado = (e.lab_state == "1") ? locale.reports_label_17 : locale.reports_label_18;
		
		b.push(
			[
				e.user_name,
				e.delivery_date,
				estado,
				e.lab_delivery_time,
				e.lab_attempts,
				e.lab_teacher_score,
				e.lab_app_score,
				e.lab_final_score,
			]
		);
 	});
	//.push(bodyData);

  	var docDefinition = {
	  content: [
		pdfHeaderObj,
	  	{ text: locale.reports_label_1, style: 'header' },
	  	{ text: locale.reports_label_2 + ': ' + data.stuName, style: 'subheader' },
	  	{ text: locale.reports_label_3 + ': ' + data.group, style: 'subheader' },
	  	{ text: locale.reports_label_4 + ': ' + data.fIni + ' a ' + data.fFin, style: 'subheader' },
	  	{ text: locale.reports_label_5 + ': ' + data.subject, style: 'subheader' },
	  	{ text: locale.reports_label_6 + ': ' + data.avanInd, style: 'subheader' },
	  	{ text: locale.reports_label_7 + ': ' + data.promInd, style: 'subheader' },
	    {
    		style: 'tableExample',
			table: {
			// headers are automatically repeated if the table spans over multiple pages
			// you can declare how many rows should be treated as headers
				headerRows: 1,
				widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
				body: b
			}
	    }
	  ],
	  styles:pdfStyles,
	  pageSize: 'FOLIO',
	  pageOrientation: 'landscape'
	};

	printer = new PdfPrinter(fonts);
	var pdfDoc = printer.createPdfKitDocument(docDefinition);

	if (!fs.existsSync(process.env.ABS_PDF_REPORTS_DIR)){
	    fs.mkdirSync(process.env.ABS_PDF_REPORTS_DIR);
	}

	var fileName = new Date().getTime().toString() + ".pdf";
	pdfDoc.pipe(fs.createWriteStream(process.env.ABS_PDF_REPORTS_DIR + '/' + fileName));
	pdfDoc.end();

	var data = {
		state:"true",
		url:""
	};

	data.url = process.env.REL_PDF_REPORTS_DIR + '/' + fileName; 
	var jData = JSON.stringify(data);
	res.end(jData);
  	//res.end();
});

router.get('/makeStuReport', function(req, res) {
	console.log(unescape(req.query.data));
	var data = JSON.parse(unescape(req.query.data));

	//////////////		PDFMAKE  	///////////////////////////

	var pdfStyles = {
			watermark: {
				margin: [0, 0, 0, 0]
			},
		header: {
			fontSize: 20,
			bold: true,
			margin: [0, 20, 0, 25]
		},
		subheader: {
			fontSize: 13,
			bold: false,
			margin: [0, 0, 0, 2]
		},
		tableExample: {
			margin: [0, 0, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	};

	var pdfHeaderObj = {
		columns: [
			{
				alignment: 'center',
				image: 'data:image/png;base64,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'
				//fontSize: 40,

			},
			{
				alignment: 'right',
				image: 'data:image/png;base64,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'
			}
		],
		style: 'watermark'
	};

	var fonts = {
		Roboto: {
			normal: process.env.ABS_FONTS_DIR + '/Roboto-Regular.ttf',
			bold: process.env.ABS_FONTS_DIR + '/Roboto-Medium.ttf',
			italics: process.env.ABS_FONTS_DIR + '/Roboto-Italic.ttf',
			bolditalics: process.env.ABS_FONTS_DIR + '/Roboto-Italic.ttf'
		}
	};
	var PdfPrinter = require('pdfmake/src/printer');
	var printer = new PdfPrinter(fonts);
		
	////////////////////////////////////////////////////////////

	var b = [];
  	var header = [
  		{ text: locale.reports_label_19, style: 'tableHeader', alignment: 'center' }, 
  		{ text: locale.reports_label_9, style: 'tableHeader', alignment: 'center' }, 
  		{ text: locale.reports_label_10, style: 'tableHeader', alignment: 'center' }, 
  		{ text: locale.reports_label_11, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_12, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_13, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_14, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_15, style: 'tableHeader', alignment: 'center' },
  		{ text: locale.reports_label_16, style: 'tableHeader', alignment: 'center' }
	];

	b.push(header);

	data.rows.forEach(function(e,i,a){
		var estado = (e.lab_state == "1") ? "Entregado" : "Pendiente";
		
		b.push(
			[
				e.lab_name,
				e.less_name,
				e.delivery_date,
				estado,
				e.lab_delivery_time,
				e.lab_attempts,
				e.lab_teacher_score,
				e.lab_app_score,
				e.lab_final_score
			]
		);
 	});
	//.push(bodyData);

  	var docDefinition = {
		/*
		header: {
			
		},*/
		content: [
			pdfHeaderObj,
			{ text: locale.reports_label_1, style: 'header' },
			{ text: locale.reports_label_8 + ': ' + data.stuName, style: 'subheader' },
			{ text: locale.reports_label_3 + ': ' + data.group, style: 'subheader' },
			{ text: locale.reports_label_4 + ': ' + data.fIni + ' a ' + data.fFin, style: 'subheader' },
			{ text: locale.reports_label_5 + ': ' + data.subject, style: 'subheader' },
			{ text: locale.reports_label_6 + ': ' + data.avanInd, style: 'subheader' },
			{ text: locale.reports_label_7 + ': ' + data.promInd, style: 'subheader' },
			{
				style: 'tableExample',
				table: {
				// headers are automatically repeated if the table spans over multiple pages
				// you can declare how many rows should be treated as headers
					headerRows: 1,
					widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
					body: b
				}
			}
		],
		styles:pdfStyles,
		pageSize: 'FOLIO',
		pageOrientation: 'landscape'
	};

	printer = new PdfPrinter(fonts);
	var pdfDoc = printer.createPdfKitDocument(docDefinition);

	if (!fs.existsSync(process.env.ABS_PDF_REPORTS_DIR)){
	    fs.mkdirSync(process.env.ABS_PDF_REPORTS_DIR);
	}

	var fileName = new Date().getTime().toString() + ".pdf";
	pdfDoc.pipe(fs.createWriteStream(process.env.ABS_PDF_REPORTS_DIR + '/' + fileName));
	pdfDoc.end();

	var data = {
		state:"true",
		url:""
	};

	data.url = process.env.REL_PDF_REPORTS_DIR + '/' + fileName; 
	var jData = JSON.stringify(data);
	res.end(jData);
  	//res.end();
});

module.exports = router;