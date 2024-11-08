
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
// creating schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name should be provided"],
        maxLength: 25,
        minLenght: 5
    },
    email: {
        unique: true,
        type: String,
        required: [true, "email should be provided"],
        maxLength: 40,
        minLenght: 5,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        maxLength: 10,
        minLenght: 10,
    },
    addressLine1: {
        type: String,
        trim: true,
        maxLength: [49, "Address Line 1 max 49 characters"],
        minLenght: 5
    },
    addressLine2: {
        type: String,
        trim: true,
        maxLength: [49, "Address Line 2 max 49 characters"],
        minLenght: 5
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: [true, "user must provide password "],
        select: false
    },
    country: {
        type: String,
        required: [true, "You are from which country must be provided"]
    },
    state: {

        type: String,
        trim: true,
        required: [true, "You are from which country must be provided"]

    },
    pinCode: {
        type: Number,
        required: [true, "You are from which state must be provided"]

    },
    cart: {
        type: [mongoose.mongo.ObjectId],
        ref: "Product"
    },
    heart: {
        type: [mongoose.mongo.ObjectId],
        ref: "Product"

    },
    Ordred: {

        type: [mongoose.mongo.ObjectId],
        ref: "Booked"
    },
    alreadyOrdred: {

        type: [mongoose.mongo.ObjectId],
        ref: "Product"
    },
    district: {
        type: String
    },
    city: {
        type: String
    },
    mobileChangeOTP: Number,
    passwordChangedAt: Date,
    passwordResetOTP: Number,
    passwordExpires: Date


})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 12);

    next()

})



userSchema.methods.correctPass = async function (inputpassword, password) {
    let t = await bcrypt.compare(inputpassword, password)

    return t
}

userSchema.methods.IsPasswordChanged = function (time) {
    if (this.passwordChanged) {
        let timeChanged = this.passwordChanged.getTime() / 1000;

        return time < timeChanged
    }

    return false;
}


userSchema.methods.changedPasswords = async function (jwttokentime) {
    if (this.changedPasswodTime) {
        const change = parseInt(this.changedPasswodTime.getTime() / 1000, 10)

        return jwttokentime < change
    }


    // if user has not change the password at least once 
    return false;
}

// now creating model out of schema 
// setting password reset token inENC





const User = mongoose.model('user', userSchema);
module.exports = User;














