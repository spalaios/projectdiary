const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = require('../../app');
const Form = require('../models/form');
const router = express.Router();
//serve the static files

// app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'public'));
// app.set('')

router.get('/', (req, res, next) => {
    res.status(200).send('your in /home directory');
    console.log('home directory finally served');
});

router.post('/data', (req, res, next) => {
    console.log(req.body);
    // res.send('data received');
    res.status(500).send('suraj said something went wrong..');
});

module.exports = router;


