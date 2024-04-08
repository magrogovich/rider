const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const { ObjectId } = require("mongodb");

const app = express()

mongoose.connect('mongodb://localhost:27017/ride')
  .then(()=>{
    app.listen(5000,()=>{
      console.log('API is running...')
    })
  })
  .catch((err)=>{
    console.log(`could not connect to db Error: ${err}`)
  })


app.get('/:id',(req,res)=>{
  User.find({sub:req.params.id})
    .then((data)=>{
      res.send(data)
    })
})
