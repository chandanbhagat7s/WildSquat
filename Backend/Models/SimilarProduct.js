
const mongoose = require('mongoose');

const similarProductSchema = mongoose.Schema({

    simillarProducts: {
        type: [Object]
    }

})

const SimilarPrduct = mongoose.model("SimilarProduct", similarProductSchema)

module.exports = SimilarPrduct;






