const { DBTable } = require('./core.js');

class SubscribersTable extends DBTable {
	constructor(dbConn) {
		super('plans', {
			id: 'bigserial PRIMARY KEY'
		}, dbConn);
	}
}

module.exports.SubscribersTable = SubscribersTable;