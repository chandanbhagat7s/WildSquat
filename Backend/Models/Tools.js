
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
        type: String
    },
    shortDescription: {
        type: String
    },
    coverImage: {
        type: String
    },
}))

const Tool = mongoose.model("Tool", toolSchema)

module.exports = Tool





















