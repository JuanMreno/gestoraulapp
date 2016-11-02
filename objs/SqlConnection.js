var mysql      = require('mysql');

var SqlConnection = function () {
  // always initialize all instance properties
	this.s = 'mysql://root:root@127.0.0.1/gestor_aula';
	this.connection = mysql.createConnection(this.s);
}

// export the class
module.exports.SqlConnection = SqlConnection;