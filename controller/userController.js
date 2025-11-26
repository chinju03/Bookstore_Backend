const users = require("../model/userModel");
const jwt = require('jsonwebtoken')

exports.registerController = async (req, res) => {
    console.log('inside register controller');
    const { username, password, email } = req.body
    console.log(username, password, email);

    //logic 

    try {
        const existingUser = await users.findOne({ email }) //key:value //email:email
        if (existingUser) {
            res.status(404).json('User Already Exists....please login')
        }
        else {
            const newUser = new users({
                username, //key:value //username : username
                email,    //key:value
                password  //key:value
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(500).json(error)

    }
}

exports.loginController = async (req,res)=>{
    console.log('inside login controller');
    const { password, email } = req.body
    console.log( password, email);

    //login
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            if(existingUser.password == password){
                const token = jwt.sign({userMail : existingUser.email}, process.env.JWTSceretKey)
                res.status(200).json({existingUser, token})
            }else{
                res.status(401).json('invalid creditionals')
            }

        }else{
            res.status(404).json('user not found!!.....please register')
        }
        
    } catch (error) {
        res.status(500).json(error)
        
    }
}


