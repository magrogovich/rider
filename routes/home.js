const express = require('express')
const {requiresAuth} = require('express-openid-connect')
const router = express.Router()
const User = require('../models/user')
const Ride = require('../models/ride')


router.get('/',requiresAuth(),(req,res)=>{

    Ride.find()
        .then(async (data)=>{
            let finalData = await Promise.all(data.map(async (info) => {
                const response = await fetch(`http://localhost:5000/${info.userId}`);
                const user = await response.json();
                let demoData = {
                    nickname: user[0].nickname,
                    picture: user[0].pic,
                    bio: user[0].bio,
                    sourceAddress: info.sourceAddress,
                    destinationAddress: info.destinationAddress,
                    rideDate: info.rideDate,
                    rideHour: info.rideHour,
                    seatsLeft: info.seatsLeft,
                };
                return demoData;
            }));

            const exist = await User.findOne({email:req.oidc.user.email})

            if(!exist){
                const authUser = new User({
                    sub:req.oidc.user.sub,
                    nickname:req.oidc.user.nickname,
                    email:req.oidc.user.email,
                    pic:req.oidc.user.picture
                })

                authUser.save()
                    .then(res.render('home',{title:'Home',data:finalData}))
            }
            res.render('home',{title:'Home',data:finalData})
        })
        .catch((err)=>{
            consol.log(err)
        })
    
})

module.exports = router
