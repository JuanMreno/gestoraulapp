var mysql      = require('mysql');

var SqlConnection = function () {
  // always initialize all instance properties
	this.s = 'mysql://root:root@127.0.0.1/gestor_aula';
	this.connection = mysql.createConnection(this.s);
}

module.exports.SqlConnection = SqlConnection;


var SqlConMultStat = function () {
  // always initialize all instance properties
	this.connection = mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  password : 'root',
  	  database: 'gestor_aula',
	  multipleStatements: true
	});
}

module.exports.SqlConMultStat = SqlConMultStat;