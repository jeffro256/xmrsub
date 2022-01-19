const { DBTable } = require('./core.js');

class ProvidersTable extends DBTable {
	constructor(dbConn) {
		super('providers', {
			id: 'bigserial PRIMARY KEY'
		}, dbConn);
	}
}

module.exports.ProvidersTable = ProvidersTable;