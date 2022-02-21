const DBTable = require('./dbtable.js');

class SubscribersTable extends DBTable {
	constructor(dbConn) {
		super('subscribers', {
			id: 'bigserial PRIMARY KEY'
		}, dbConn);
	}
}

module.exports = SubscribersTable;