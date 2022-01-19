const session = require('express-session');

function configSessionForApp(app) {
	app.use(session({
		resave: true,
		saveUninitialized: true,
		secret: 'ipwgwpdbwqqodqbuwtdvakbd',
		cookie: { maxAge: 60000 }
	}));
}

module.exports.configSessionForApp = configSessionForApp;