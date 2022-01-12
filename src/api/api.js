const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const { Strategy } = require('passport-http-bearer');

const app = express();
app.use(morgan('tiny'));

const server = app.listen(3000);
