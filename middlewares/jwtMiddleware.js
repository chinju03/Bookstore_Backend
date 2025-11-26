const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log('inside JWT Middleware');
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token, process.env.JWTSceretKey)
        console.log(jwtResponse);
        req.payload = jwtResponse.userMail
        next()
        // console.log(req.payload);
    } catch(err) {
        res.status(500).json("invalid token",err)
    }

}

module.exports = jwtMiddleware