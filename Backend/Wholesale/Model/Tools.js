
const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema(({
    name: {
        type: String,
        required: [true, "must provide type of tool you are creating"]
    },
    products: {
        type: [mongoose.mongo.ObjectId],
        ref: "Wproduct"

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


    images: {
        type: [String]
    }
}))

const Tool = mongoose.model("wTool", toolSchema)

module.exports = Tool





















