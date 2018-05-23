const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();


//route for login 

router.post('/data', (req, res, next) => {
    User.find({username : req.body.username})
        .exec()
        .then((user) => {
            //if user is found then check the password of it via bcrypt 
            if(user.length <= 0) {
                return res.status(401).json({
                    message: "username is not correct"
                  });
            }
            else if(user.length > 0) {
                const hashPassword = user[0].password;
                //check the password
                bcrypt.compare(req.body.password, hashPassword, (err, result) => {
                    if(err) {
                        return res.status(401).send({
                            message : 'You failed to authenticate coz of bcrypt comparison'
                        });
                    }

                    if(result) {
                        
                        const token = jwt.sign(
                            {
                                email : user[0].email,
                                username : user[0].username
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn : "1h"
                            }
                        );
                        return res.status(200).send({
                            message : 'success',
                            token : token
                        });
                    //    return res.redirect('/welcome');
                        // return res.status(200);
                        //  res.status(200).redirect('/welcome.html');
                        
                    }
                    res.status(401).json({
                        message: "username or password is not correct"
                      });
                });
                   
            }
            
        }).catch((err) => {
            res.status(500).send({
                message : 'No such user found in our database hence authentication failed'
            });
        });
});



module.exports = router;