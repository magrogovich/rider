const express = require('express')
const {requiresAuth} = require('express-openid-connect')
const router = express.Router()
const User = require('../models/user')



router.get('/',requiresAuth(),async (req,res)=>{
    const dbUser = await User.findOne({email:req.oidc.user.email})
    res.render('profile',{title:'Profile',user:req.oidc.user,bio:dbUser.bio})
})

module.exports = router
