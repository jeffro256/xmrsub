'use strict';

(function setupEnv() {
	const dotenv = require('dotenv');
	dotenv.config();

	const mandatoryEnvVars = ['PGDB_URL', 'API_COOKIE_SECRET', 'MONERO_PRIVATE_VIEWKEY'];
	const envVarDefaults = {
		PGDB_REJECT_UNAUTH: 'true',
		STATIC_DIR: 'public_html',
		API_COOKIE_MAXAGE: '3600',
		MONERO_NETWORK_TYPE: 'stagenet'
	}

	// Check for mandatory environment variables
	mandatoryEnvVars.forEach(v => {
		if (process.env[v] === undefined) {
			throw new Error(`mandatory env var ${v} is not defined`);
		}
	});

	// Provide default values to environment variables not defined
	for (const v in envVarDefaults) {
		if (process.env[v] === undefined) {
			process.env[v] = envVarDefaults[v];
		}
	}
})();

const { app } = require('./src/api/api.js');
const db = require('./src/db');

(async function main() {
	await db.connect();
	await db.logins.create();
	//await db.logins.createUser("foo@tutanota.com", "meepmeep77840");

	app.listen(3000, err => {
		if (err) {
			console.error(err);
		} else {
			console.log("Started server");
		}
	});
})();