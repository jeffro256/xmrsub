const { Client: PGClient } = require('pg');

const { InstancesTable } = require('./instances.js');
const { LoginsTable } = require('./logins.js');
const { PlansTable } = require('./plans.js');
const { ProvidersTable } = require('./providers.js');
const { SubscribersTable } = require('./subscribers.js');

const connection = new PGClient({
	connectionString: process.env.PGDB_URL,
	ssl: {
		rejectUnauthorized: process.env.PGDB_REJECT_UNAUTH == 'true',
	}
});

module.exports.connect = connection.connect.bind(connection);
module.exports.end = connection.end.bind(connection);
module.exports.connection = connection;

module.exports.instances = new InstancesTable(connection);
module.exports.logins = new LoginsTable(connection);
module.exports.plans = new PlansTable(connection);
module.exports.providers = new ProvidersTable(connection);
module.exports.subscribers = new SubscribersTable(connection);
