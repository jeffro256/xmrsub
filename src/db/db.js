const { Client: PGClient } = require('pg');

const { LoginsTable } = require('./logins.js');

const connection = new PGClient({
	connectionString: process.env.PGDB_URL,
	ssl: {
		rejectUnauthorized: process.env.PGDB_REJECT_UNAUTH == 'true',
	}
});

const logins = new LoginsTable(connection);

module.exports.connect = connection.connect.bind(connection);
module.exports.end = connection.end.bind(connection);
module.exports.logins = logins;
module.exports.connection = connection;
