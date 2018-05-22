const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const formRouter = require('./api/routes/home');
const app = express();

//set the mongoose promise as globals promise

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/projectdiary');

//app middleware goes here...

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



//routes setting

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/home', formRouter);

module.exports = app;