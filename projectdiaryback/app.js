const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const formRouter = require('./api/routes/home');
const userRouter = require('./api/routes/users');
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
app.use('/signup', express.static(path.join(__dirname, 'public/signup.html')));
app.use('/home', formRouter);
app.use('/signup', userRouter);


//error handling for wrong routes

app.use((req, res, next) => {
    //create a new error 
    const error = new Error('Not found due to wrong request method on the given route');
    error.status = 404;
    next(error);
});

//error middleware

app.use((error, req, res, next) => {
    return res.status(error.status || 500).send({
        message : error.message
    });
});

module.exports = app;