const express = require('express');
const router = express.Router();
const path = require('path');
const checkAuth = require('../authorization/checkAuth');

// console.log(path.join(__dirname, '../../public'));
router.post('/',(req, res,  next) => {
    var servResp = {};
    servResp.success = true;
    servResp.redirect = true;
    servResp.redirectURL = "http://localhost:5000/welcome";
    res.send(servResp); 
});

router.get('/', (req, res, next) => {
    // return res.send('Welcome ...');
    // return res.sendfile('../../public/welcome.html');
    return res.sendFile(path.join(__dirname, '../../public/welcome.html'));
});






module.exports = router;