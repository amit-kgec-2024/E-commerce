const express = require("express");
const router = express.Router();
const Users = require("../modules/Users");
const ReviewsComment = require("../modules/ReviewsComment");

// Product Reviews POST.......
router.post("/productComment", async (req, res) => {
  try {
    const { productId, comment, userId } = req.body;
    if (!productId || !comment || !userId) {
      res.status(400).send("Fill All Requires");
    } else {
      const newComment = new ReviewsComment({
        productId,
        comment,
        userId,
      });
      newComment.save();
      return res.status(200).send("product Comment register Successfully");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// productComment GET Request.............
router.get("/productcomment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productComment = await ReviewsComment.find({
      productId: id,
    });
    if (productComment.length === 0) {
      return res.status(404).send("No comments found for this product.");
    }
    const commentData = await Promise.all(
      productComment.map(async (review) => {
        const users = await Users.findById(review.userId);
        return {
          commentId: review._id,
          productId: review.productId,
          userId: review.userId,
          firstname: users.firstname,
          lastname: users.lastname,
          comment: review.comment,
        };
      })
    );

    res.status(200).send(commentData);
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
});
// Delet comment.....................
router.delete("/comment/delete/:commentId", async (req, res) => {
  try {
    const id = req.params.commentId;
    console.log(`Attempting to delete comment with ID: ${id}`);

    const comment = await ReviewsComment.findByIdAndDelete(id); 
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(`Error deleting comment with ID: ${id}`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
