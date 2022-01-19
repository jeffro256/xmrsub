const { DBTable } = require('./core.js');

class PlansTable extends DBTable {
	constructor(dbConn) {
		super('plans', {
			id: 'bigserial PRIMARY KEY',
			provider: 'bigserial NOT NULL REFERENCES providers(id)',
			amount: 'bigint NOT NULL',
			payprdtype: 'varchar(16) NOT NULL',
			payprdnumber: 'int NOT NULL',
			snapped: 'boolean NOT NULL',
			currency: 'varchar(16) NOT NULL',
			graceprdtype: 'varchar(16)',
			graceprdnumber: 'int NOT NULL'
		}, dbConn);
	}
}

module.exports.PlansTable = PlansTable;