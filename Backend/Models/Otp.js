const mongoose = require('mongoose');


const otpSchema = mongoose.Schema({
    otp: {
        type: Number,
        required: [true, "Error in creating Otp, please try again"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    validUntil: Date

})

const Otp = mongoose.model("otp", otpSchema);
module.exports = Otp




















