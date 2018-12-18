'use strict';

require('dotenv').load();
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const router = require('./app/routes/index.js');
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

let app = express();

mongoose.connect(MONGO_URI);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
