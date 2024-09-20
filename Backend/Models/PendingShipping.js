const mongoose = require('mongoose');

const PendingShippingSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.mongo.ObjectId,
        ref: "Booked"
    },
    userId: {
        type: mongoose.mongo.ObjectId,
        ref: "User"

    },
    toAddress: {
        type: String
    }
})

const PendingShipping = mongoose.model("PendingShipping", PendingShippingSchema);
module.exports = PendingShipping;





























