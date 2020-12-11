const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// routes
const indexRouter = require('./routes');
const apiRoutes = require('./routes/api');

// db
require('./database');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', indexRouter);
app.use('/api', apiRoutes);

module.exports = app;
