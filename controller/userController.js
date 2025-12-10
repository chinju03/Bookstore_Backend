const { json } = require("express");
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

exports.loginController = async (req, res) => {
    console.log('inside login controller');
    const { password, email } = req.body
    console.log(password, email);

    //login
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email, role: existingUser.role }, process.env.JWTSceretKey)
                res.status(200).json({ existingUser, token })
            } else {
                res.status(401).json('invalid creditionals')
            }

        } else {
            res.status(404).json('user not found!!.....please register')
        }

    } catch (error) {
        res.status(500).json(error)

    }
}

exports.googleloginController = async (req, res) => {
    console.log('inside google login controller');
    const { password, email, username, profile } = req.body
    console.log(password, email, username, profile);

    //login
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ userMail: existingUser.email, role: existingUser.role }, process.env.JWTSceretKey)
            res.status(200).json({ existingUser, token })

        } else {
            const newUser = new users({
                username, email, password, profile
            })
            await newUser.save()
             const token = jwt.sign({ userMail: newUser.email, role: existingUser.role }, process.env.JWTSceretKey)
            res.status(200).json({ existingUser: newUser, token })
        }

    } catch (error) {
        res.status(500).json(error)

    }
}

exports.uploadUserProfileController = async (req, res) => {
    console.log('inside profile edit controller');
    const { username, password, bio, role, profile } = req.body
    const uploadProfile = req.file ? req.file.filename : profile
    const email = req.payload

    try {
        const profileEdit = await users.findOneAndUpdate({ email }, { username, password, bio, role, profile: uploadProfile }, { new: true })
        res.status(200).json(profileEdit)

    } catch (error) {
        res.status(500).json(error)

    }

}

exports.getAllUsersAdminController = async (req, res) => {
    console.log('inside get all user admin controller');
    const userMail = req.payload
    try {
        const allUsers = await users.find({ email: { $ne: userMail } })
        res.status(200).json(allUsers)

    } catch (error) {
        res.status(500).json(error)

    }
}

//update admin profile
exports.uploadAdminProfileController = async (req, res) => {
    console.log('inside admin profile edit controller');
    const { username, password, profile } = req.body
    const uploadProfile = req.file ? req.file.filename : profile
    const email = req.payload
    const role = req.role

    try {
        const updateAdmin = await users.findOneAndUpdate({ email }, { username, password, role, profile: uploadProfile }, { new: true })
        res.status(200).json(updateAdmin)

    } catch (error) {
        res.status(500).json(error)

    }

}


