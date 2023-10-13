const express = require('express')
const router = express.Router()
const User = require('../models/User');
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// register

router.post('/register',async(req,res)=>{
    try {
        req.body.password = await bcrypt.hash(req.body.password,11)
        const {username,email,password} =req.body;
        const newUser = new User({username,email,password})
        const saveUser = await newUser.save()
        res.status(200).json(saveUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//login


//logout


module.exports = router;