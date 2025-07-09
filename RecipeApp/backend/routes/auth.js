const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SignUpSchema, LoginSchema } = require('../validations/AuthValidation')
require('dotenv').config()



router.post('/signup', async(req, res) => {
    try{

        const result = SignUpSchema.safeParse(req.body)

        if(!result.success){
            return res.status(400).json({error: result.error.issues.map(x => x.message).join(', ')})
        }

        const { first_name, last_name, email, password } = req.body;

        const isUserExist = await User.findOne({ email })
        if(isUserExist){
            return res.status(400).json({message: 'User already exist.'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, 10)


        const newUser = new User({ first_name, last_name, email, password:hashedPassword })

        await newUser.save()

        res.status(201).json({ message: 'User register, please login.' })
    }catch(err){
        return res.status(400).json({message: err.message})
    }
})


router.post('/login', async(req, res) => {
    try{

        const result = LoginSchema.safeParse(req.body)

        if(!result.success){
            return res.status(400).json({error: result.error.issues.map(x => x.message).join(', ')})
        }

        const { email, password } = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Invalid credentials.'})
        }


        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({message: 'Invalid credentials.'})
        }

        const payload = { id: user._id }

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        const userData = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        }

        res.status(200).json({token, user:userData})

    }catch(err){
        return res.status(400).json({message: err.message})
    }
})


module.exports = router
