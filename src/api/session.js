const session = require('express-session');

function configSessionForApp(app) {
	app.use(session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.API_COOKIE_SECRET,
		cookie: { maxAge: Number(process.env.API_COOKIE_MAXAGE) }
	}));
}

module.exports.configSessionForApp = configSessionForApp;