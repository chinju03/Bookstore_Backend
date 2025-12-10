const adminjwt = require('jsonwebtoken');
const users = require('../model/userModel');

const adminjwtMiddleware = (req, res, next) => {
    console.log('inside admin jwt middleware');
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);

    try {
        const adminJWTResponse = adminjwt.verify(token, process.env.JWTSceretKey)
        console.log(adminJWTResponse);
        req.payload = adminJWTResponse.userMail
        req.role = adminJWTResponse.role
        if (adminJWTResponse.role == 'admin') {
            next()
        } else {
            res.status(401).json('Access denied. Admins only.')
        }

    } catch (error) {
        res.status(500).json("invalid admin token", error)

    }
}

module.exports = adminjwtMiddleware