const BearerStrategy = require('passport-http-bearer').Strategy;
const body_parser = require('body-parser');
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const db = require('../db/db.js');

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

passport.deserializeUser((id, done) => {
	db.logins.keyLookup(id)
		.then(user => done(null, user))
		.catch(done);
});

// create the server
const app = express();

// add & configure middleware
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
/*app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))*/
app.use(passport.initialize());
app.use(passport.session());

// create the homepage route at '/'
app.get('/', (req, res) => {
  res.send(`You got home page!\n`)
});

// create the login get and post routes
app.get('/login', (req, res) => {
  res.send(`You got the login page!\n`)
});

app.post('/login',
	passport.authenticate('local'),
	(req, res, next) => {
		res.end('You have been authenticated ;)');
	}
);

app.get('/authrequired', (req, res) => {
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
});

module.exports.app = app;
