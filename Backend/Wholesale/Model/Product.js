const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    price: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    longDescription: {
        type: String,
        required: true,
        trim: true
    },
    material: {
        type: String,
        required: true,
        trim: true
    },
    sizes: {
        type: [Object],
        required: true,
    },

    images: {
        type: [String], // Array of image URLs
        required: true
    },

    features: {
        type: [String],
        required: true
    },
    careInstructions: {
        type: String,
        required: true,

    },
    status: {
        type: String,
        enum: ["in stock", "out of stock"],
        default: "in stock"
    },
    colors: {
        type: Number
    },
    moq: {
        type: Number
    }


});

const WProduct = mongoose.model('Wproduct', productSchema);

module.exports = WProduct;
