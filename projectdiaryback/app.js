const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const formRouter = require('./api/routes/home');
const userRouter = require('./api/routes/users');
const loginRouter = require('./api/routes/login');
const welcomeRouter = require('./api/routes/welcome');
const checkAuth = require('./api/authorization/checkAuth.js');
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
app.use('/login', express.static(path.join(__dirname, 'public/login.html')));
// app.use('/welcome', express.static(path.join(__dirname, 'public/welcome.html')));
app.use('/home', formRouter);
app.use('/signup', userRouter);
app.use('/login', loginRouter);
app.use('/welcome', welcomeRouter);

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