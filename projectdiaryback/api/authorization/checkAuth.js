const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization;
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userDecodedData = decoded;
        next();
    } catch(err) {
        return res.status(401).send({
            message : 'Authentication failed in check auth'
        });
    }
}