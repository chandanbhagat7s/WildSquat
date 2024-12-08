
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

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

toolSchema.post('findOneAndDelete', async function (doc) {
    console.log("doc ", doc);

    if (doc && doc.images && doc.images.length > 0) {
        doc.images.forEach((image) => {
            const imagePath = path.join(__dirname, '../../Public/wholesale/tool', image); // Adjust path if needed

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image at ${imagePath}:`, err.message);
                } else {
                    console.log(`Successfully deleted image at ${imagePath}`);
                }
            });
        });
    }
});


const Tool = mongoose.model("wTool", toolSchema)

module.exports = Tool





















