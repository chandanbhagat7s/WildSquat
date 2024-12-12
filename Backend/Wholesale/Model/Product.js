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
    },
    sizeOption: {
        type: Boolean,
        default: false
    },
    hidden: {
        type: Boolean,
        default: false
    }


});

productSchema.pre(/^find/, function (next) {
    // console.log(this.options.disableMiddlewares);  we set the  property okk to provide login access to deactive user
    console.log("CAME INTO <", this.options.disableSchemaMiddleware);

    if (this.options.disableSchemaMiddleware) {

        next();
    }
    else {
        console.log("passssed");

        this.where({ hidden: false });
        next();
    }

});

const WProduct = mongoose.model('Wproduct', productSchema);

module.exports = WProduct;
