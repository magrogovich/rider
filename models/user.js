const mongoose = require('mongoose')


const user = new mongoose.Schema({
    sub: String,
    nickname: String,
    email: String,
    pic: String,
    bio: {
        type: String,
        default: null
    }
},{ timestamps: true })

const User = mongoose.model('User',user)
module.exports = User