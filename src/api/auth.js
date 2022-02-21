const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const db = require('../db/db.js');

function attachLogins(app) {
	app.post('/login/password',
		passport.authenticate('local'),
		(req, res, next) => {
			res.end('You have been authenticated ;)\n');
		}
	);

	app.post('/login/logout',
		(req, res, next) => {
			const isLoggedIn = req.isAuthenticated();
			req.logout();

			if (isLoggedIn) {
				res.end('You have been logged out\n');
			} else {
				res.end('You were already logged out\n');
			}
		}
	);
}

function guardAuth(redirectURL) {
	function middleware(req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else if (redirectURL) {
			res.redirect(redirectURL);
		} else {
			res.status(401).end("Your request is not authenticated for this endpoint.\n");
		}
	}

	return middleware;
}

function configPassport() {
	passport.use(new LocalStrategy(
		{ usernameField: 'email' },
		async (email, password, done) => {
			try {
				const user = await db.logins.tryLogin(email, password);
				done(null, user);
			} catch (err) {
				done(err);
			}
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			done(null, await db.logins.keyLookup(id));
		} catch (err) {
			done(err);
		}
	});
}

function configPassportForApp(app) {
	app.use(passport.initialize());
	app.use(passport.session());
}

module.exports.attachLogins = attachLogins;
module.exports.configPassport = configPassport;
module.exports.configPassportForApp = configPassportForApp;
module.exports.guardAuth = guardAuth;