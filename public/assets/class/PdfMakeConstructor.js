
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
  		{ text: 'N. App', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Final', style: 'tableHeader', alignment: 'center' }
	];

	b.push(header);

	data.rows.forEach(function(e,i,a){
		var estado = e.Estado ? "Entregado" : "Pendiente";
		b.push(
			[
				e.Practica,
				e.Fecha,
				estado,
				e.N_PROFESOR,
				e.N_APP,
				e.N_FINAL,
			]
		);
 	});
	//.push(bodyData);

  	var docDefinition = {
	  content: [
	  	{ text: 'Reporte de Notas', style: 'header' },
	  	{ text: 'Nombre: ' + data.name, style: 'subheader' },
	  	{ text: 'Fecha:	' + data.date, style: 'subheader' },
	  	{ text: 'Grupo: ' + data.group, style: 'subheader' },
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
}