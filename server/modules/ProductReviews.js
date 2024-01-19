const mongoose = require('mongoose')

const reviewsSchema = mongoose.Schema({
    productId: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    reviews: {
        type: String,
        require: true
    }
})

const ProductReviews = mongoose.model('ProductReviews', reviewsSchema);

module.exports = ProductReviews;