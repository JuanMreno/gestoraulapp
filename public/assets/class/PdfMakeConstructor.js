
class PdfMakeConstructor {
  constructor(fileName) {
  	this.fName=fileName;

  	this.styles = {
		header: {
			fontSize: 20,
			bold: true,
			margin: [0, 0, 0, 25]
		},
		subheader: {
			fontSize: 13,
			bold: false,
			margin: [0, 0, 0, 2]
		},
		tableExample: {
			margin: [0, 20, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	};
  }

  makeStudentReport(data) {
  	var b = [];
  	var header = [
  		{ text: 'Práctica', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Fecha', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Estado', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Profesor', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Lab', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Final', style: 'tableHeader', alignment: 'center' }
	];

	b.push(header);

	data.rows.forEach(function(e,i,a){
		var estado = (e.lab_state == "1") ? "Entregado" : "Pendiente";
		b.push(
			[
				e.lab_name,
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
	  	{ text: 'Reporte de notas', style: 'header' },
	  	{ text: 'Nombre: ' + data.name, style: 'subheader' },
	  	{ text: 'Fecha:	' + data.date, style: 'subheader' },
	  	//{ text: 'Grupo: ' + data.group, style: 'subheader' },
	  	{ text: 'Materia: ' + data.subject, style: 'subheader' },
	    {
    		style: 'tableExample',
			table: {
			// headers are automatically repeated if the table spans over multiple pages
			// you can declare how many rows should be treated as headers
				headerRows: 1,
				widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
				body: b
			}
	    }
	  ],
	  styles:this.styles
	};
 	pdfMake.createPdf(docDefinition).download(this.fName);
  }

  makeStuEvalReport(data){
  	console.log(data);
  	var b = [];
  	var header = [
  		{ text: 'Práctica', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Fecha', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Estado', style: 'tableHeader', alignment: 'center' },
  		{ text: 'Tiempo entrega', style: 'tableHeader', alignment: 'center' },
  		{ text: 'Intentos', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Profesor', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Lab', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Final', style: 'tableHeader', alignment: 'center' }
	];

	b.push(header);

	data.rows.forEach(function(e,i,a){
		var estado = (e.lab_state == "1") ? "Entregado" : "Pendiente";
		b.push(
			[
				e.lab_name,
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
	  	{ text: 'Reporte de notas', style: 'header' },
	  	{ text: 'Nombre: ' + data.stuName, style: 'subheader' },
	  	{ text: 'Grupo: ' + data.group, style: 'subheader' },
	  	{ text: 'Periodo:	' + data.fIni + ' a ' + data.fFin, style: 'subheader' },
	  	{ text: 'Materia: ' + data.subject, style: 'subheader' },
	  	{ text: 'Avance: ' + data.avanInd, style: 'subheader' },
	  	{ text: 'Promedio: ' + data.promInd, style: 'subheader' },
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
	  styles:this.styles
	};
 	pdfMake.createPdf(docDefinition).download(this.fName);
  }

  makeStuEvalReport(data,type){
  	console.log(data);
  	
  	var b = [];
  	var header = [
  		{ text: 'Práctica', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Fecha', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Estado', style: 'tableHeader', alignment: 'center' },
  		{ text: 'Tiempo entrega', style: 'tableHeader', alignment: 'center' },
  		{ text: 'Intentos', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Profesor', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Lab', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Final', style: 'tableHeader', alignment: 'center' }
	];

	b.push(header);

	data.rows.forEach(function(e,i,a){
		var estado = (e.lab_state == "1") ? "Entregado" : "Pendiente";
		var name;

		if(type == 'lab') 
			name = e.user_name;
		else
			name = e.lab_name;
		
		b.push(
			[
				name,
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
	  	{ text: 'Reporte de notas', style: 'header' },
	  	{ text: 'Nombre: ' + data.stuName, style: 'subheader' },
	  	{ text: 'Grupo: ' + data.group, style: 'subheader' },
	  	{ text: 'Periodo:	' + data.fIni + ' a ' + data.fFin, style: 'subheader' },
	  	{ text: 'Materia: ' + data.subject, style: 'subheader' },
	  	{ text: 'Avance: ' + data.avanInd, style: 'subheader' },
	  	{ text: 'Promedio: ' + data.promInd, style: 'subheader' },
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
	  styles:this.styles
	};
 	pdfMake.createPdf(docDefinition).download(this.fName);
  }
}