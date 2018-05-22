const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/data', (req, res, next) => {
    console.log(req.body);
    // check if username already exists or not
    User.find({username : req.body.username})
        .exec()
        .then((result) => {
            if(result.length > 0) {
                // this means a user with the given name exists in db and should send a message saying so
                return res.status(409).send({
                    message : 'Username exists'
                });
            } else {
                //if not then create the profile with the given credentials 
                // make sure the passwords are encrypted while storing it to the database

                bcrypt.hash(req.body.password, 10, (err, hash) =>{
                    if(err) {
                        return res.status(500).send({
                            message : 'Error while creating profile with the given credentials'
                        });
                    }

                    const user = new User({
                        _id : mongoose.Types.ObjectId(),
                        username : req.body.username,
                        email : req.body.email,
                        password : hash,
                        contact : req.body.contact
                    });

                    console.log(user);

                    //save the user to db
                    user.save()
                        .then((result) => {
                            console.log(result);
                            return res.status(201).send('Profile created successfully');
                        }).catch((err) => {
                            return res.status(500).send('Error while saving credentials to databse');
                        });
                });
            }
            
        }).catch((err) => {
            return res.status(500).send({
                message : 'Error while fetching username from database'
            });
        });
    
});

module.exports = router;