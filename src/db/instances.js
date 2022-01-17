const { DBTable } = require('./core.js');

class InstancesTable extends DBTable {
	constructor(dbConn) {
		super('instances', {
			plan: 'bigint NOT NULL',
			subscriber: 'bigint NOT NULL',
			recvaddr: 'varchar(255) NOT NULL',
			extusers: 'varchar(255) ARRAY NOT NULL'
		}, dbConn);
	}
}