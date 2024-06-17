const express = require("express");
const router = express.Router();
const ProductReviews = require("../modules/ProductReviews");

// Product Reviews POST.......
router.post("/productReviews", async (req, res) => {
  try {
    const { productId, username, reviews } = req.body;
    if (!productId || !username || !reviews) {
      res.status(400).send("Fill All Requires");
    } else {
      const newReviews = new ProductReviews({
        productId,
        username,
        reviews,
      });
      newReviews.save();
      return res.status(200).send("product Reviews register Successfully");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// ProductReviews GET Request.............
router.get("/productReviews/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const productreviews = await ProductReviews.find({
      productId: productId,
    });
    const reviesData = Promise.all(
      productreviews.map(async (review) => {
        return {
          review: {
            productId: review.productId,
            username: review.username,
            reviews: review.reviews,
          },
        };
      })
    );

    res.status(200).send(await reviesData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
module.exports = router;
