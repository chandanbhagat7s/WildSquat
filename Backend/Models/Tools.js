
const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema(({
    name: {
        type: String,

        required: [true, "must provide type of tool you are creating"]
    },
    products: {
        type: [mongoose.mongo.ObjectId],
        ref: "Product"

    },
    label: {
        type: String,
        trim: true,
        required: [true, "must provide Label(name)"]
    },
    shortDescription: {
        type: String,
        required: [true, "must provide short description "]
    },
    coverImage: {
        type: String,
        required: [true, "must provide cover image "]
    },
    gender: {
        type: String,
        required: [true, "must provide gender"]
    }
}))

const Tool = mongoose.model("Tool", toolSchema)

module.exports = Tool





















