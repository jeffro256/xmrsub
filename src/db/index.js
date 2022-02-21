const { create_db_connection } = require('./dbconnection.js');

const connection = create_db_connection();
module.exports.connection = connection;

module.exports.instances = new require('./instances.js')(connection);
module.exports.logins = new require('./logins.js')(connection);
module.exports.payments = new require('./payments.js')(connection);
module.exports.plans = new require('./plans.js')(connection);
module.exports.providers = new require('./providers.js')(connection);
module.exports.subscribers = new require('./subscribers.js')(connection);
