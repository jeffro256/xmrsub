const body_parser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const db = require('../db/db.js');
const auth = require('./auth.js');
const session = require('./session.js');

auth.configPassport();

const app = express();
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(morgan('tiny'));
session.configSessionForApp(app);
auth.configPassportForApp(app);
app.use(express.static(process.env.STATIC_DIR));
auth.attachLogins(app);

app.get('/authrequired',
	auth.guardAuth(),
	(req, res) => {
		res.end('you hit the authentication endpoint\n');
	}
);

module.exports.app = app;
