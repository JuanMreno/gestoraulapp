var mysql      = require('mysql');

var SqlConnection = function () {
  // always initialize all instance properties
	this.s = 'mysql://root:root@localhost/gestor_aula';
	this.connection = mysql.createConnection(this.s);
}

// export the class
module.exports.SqlConnection = SqlConnection;