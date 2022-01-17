const { DBTable } = require('./core.js');

class ProvidersTable extends DBTable {
	constructor(dbConn) {
		super('providers', {
			
		}, dbConn);
	}
}

module.exports.ProvidersTable = ProvidersTable;