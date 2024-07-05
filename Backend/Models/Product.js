const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
        required: true
    },
    category: {
        type: [String],
        required: true,

    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    images: {
        type: [String], // Array of image URLs
        required: true
    },
    coverImage: {
        type: String, // Array of image URLs
        required: true
    },
    brand: {
        type: String,
        trim: true
    },
    material: {
        type: String,
        required: true,
        trim: true
    },
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    review: {
        type: [mongoose.mongo.ObjectId],
        ref: "Review"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
