const express = require('express')
const {requiresAuth} = require('express-openid-connect')
const router = express.Router()


router.get('/',requiresAuth(),(req,res)=>{
    res.render('profile',{title:'Profile',user:req.oidc.user})
})

module.exports = router
