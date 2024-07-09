

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'something to be written in review to be posted']
    },
    ofProduct: {
        type: mongoose.mongo.ObjectId,
        ref: 'Product',
        required: [true, 'review must belong to specific Product']
    },
    byUser: {
        type: mongoose.mongo.ObjectId,
        ref: 'user',
        required: [true, 'review must belong to specific user']
    },
    rating: {
        type: Number,
        required: [true, 'A product must have rating '],
        max: [5, "reating to not be more then 5"],
        min: [1, "rating to be atleast 1"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

reviewSchema.pre(/^find/, function (next) {

    this.populate({
        path: 'byUser',
        select: 'name -_id createdAt'
    })
    next()
})


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;













































