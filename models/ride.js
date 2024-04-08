const mongoose = require('mongoose')


const ride = new mongoose.Schema({
    userId: String,
    sourceAddress: String,
    destinationAddress: String,
    rideDate: Date,
    rideHour: String,
    seatsLeft: Number
},{ timestamps: true })

const Ride = mongoose.model('Ride',ride)
module.exports = Ride