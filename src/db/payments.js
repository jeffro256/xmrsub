const DBTable = require('./dbtable.js');

class PaymentsTable extends DBTable {
	constructor(dbConn) {
		super('payments', {
			id: 'bigserial PRIMARY KEY',
			ticker: 'varchar(6) NOT NULL',
			txid: 'varchar(255) NOT NULL',
			height: 'bigint',
			fromaddr: 'varchar(255) NOT NULL',
			toaddr: 'varchar(255) NOT NULL',
			amount: 'bigint NOT NULL',
		}, dbConn);
	}
}

module.exports = PaymentsTable;
