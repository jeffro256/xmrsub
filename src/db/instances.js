const { DBTable } = require('./core.js');

class InstancesTable extends DBTable {
	constructor(dbConn) {
		super('instances', {
			plan: 'bigserial NOT NULL REFERENCES plans(id)',
			subscriber: 'bigserial NOT NULL REFERENCES subscribers(id)',
			recvaddr: 'varchar(255) NOT NULL',
			extusers: 'varchar(255) ARRAY NOT NULL'
		}, dbConn);
	}
}

module.exports.InstancesTable = InstancesTable;