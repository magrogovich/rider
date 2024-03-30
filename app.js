const express = require('express')
const { auth } = require('express-openid-connect');
require('dotenv').config()
// pages call
const home = require('./routes/home')
const profile = require('./routes/profile')



const app = express()



// configuration
app.set('view engine','ejs')
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// settings
app.use(express.static('public'))
app.use(auth(config));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// pages
app.use('/',home)
app.use('/profile',profile)



app.listen(3000,()=>{
  console.log('listening on port 3000')
})



