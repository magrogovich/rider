const express = require('express')
const {requiresAuth} = require('express-openid-connect')
const router = express.Router()
const User = require('../models/user')


router.post('/',requiresAuth(),async (req,res)=>{
    const dbUser = await User.findOne({email:req.oidc.user.email})
    dbUser.bio = req.body.bio
    dbUser.save()
        .then(res.redirect('/profile'))


})

module.exports = router