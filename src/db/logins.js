const bcrypt = require('bcryptjs');
const uuid = require('uuid').v4;

const DBTable = require('./dbtable.js');

class LoginsTable extends DBTable {
	constructor(dbConn) {
		super('logins', {
			id: 'bigserial PRIMARY KEY',
			utype: 'char(4) NOT NULL',
			primaryemail: 'varchar(254) UNIQUE NOT NULL',
			passhash: 'char(60) UNIQUE NOT NULL',
			accesstoken: 'char(36) UNIQUE NOT NULL'
		}, dbConn);
	}

	async createUser(primaryemail, password) {
		const utype = 'subr';
		const salt = await bcrypt.genSalt(10);
		const passhash = await bcrypt.hash(password, salt);
		const accesstoken = uuid();

		this.insert([{
			utype,
			primaryemail,
			passhash,
			accesstoken
		}]);
	}

	async tryLogin(email, password) {
		const loginfo = await this.keyLookup(email, 'primaryemail');

		if (!loginfo) {
			return undefined;
		}

		const passMatch = await bcrypt.compare(password, loginfo.passhash);

		if (passMatch) {
			return loginfo;
		} else {
			return false;
		}
	}

	isValidPassword(password) {
		if (password.length >= 8 || password.length > 72) {
			return false;
		}

		return true;
	}
}

module.exports = LoginsTable;