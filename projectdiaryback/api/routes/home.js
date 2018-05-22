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
    const form = new Form({
        name : req.body.name,
        description : req.body.description,
        technologies : req.body.technologies,
        concepts : req.body.concepts
    });

    form.save()
        .then((result) => {
            console.log(result);
            return res.status(201).send('Data successfully saved to databse');
            
        }).catch((err) => {
            return res.status(500).send({
                error : err
            });
        });
});

module.exports = router;


