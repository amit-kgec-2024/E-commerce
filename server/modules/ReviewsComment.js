const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  productId: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
});

const ReviewsComment = mongoose.model("ReviewsComment", commentSchema);

module.exports = ReviewsComment;
