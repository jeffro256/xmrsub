function create_db_connection() {
	return new PGClient({
		connectionString: process.env.PGDB_URL,
		ssl: {
			rejectUnauthorized: process.env.PGDB_REJECT_UNAUTH == 'true',
		}
	});
}

module.exports.create_db_connection = create_db_connection;