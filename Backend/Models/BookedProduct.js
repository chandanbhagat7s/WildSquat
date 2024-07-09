
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    byuser: {
        required: [true, "must have an owner"],
        type: mongoose.mongo.ObjectId,
        ref: "user"
    },
    ofProduct: {
        required: [true, "must have an owner"],
        type: mongoose.mongo.ObjectId,
        ref: "Product"
    },
    price: {
        type: Number,

    },


})

const Booked = mongoose.model("Booked", productSchema)

module.exports = Booked


















