const { Client: PGClient } = require('pg');

const { DBTable } = require('./core.js');

class LoginsTable extends DBTable {
	constructor(dbConn) {
		super('logins', {
			uid: 'bigint PRIMARY KEY',
			utype: 'char(4) NOT NULL',
			email: 'varchar(254) NOT NULL',
			passhash: 'char(60) NOT NULL'
		}, dbConn);
	}
}

module.exports.LoginsTable = LoginsTable;