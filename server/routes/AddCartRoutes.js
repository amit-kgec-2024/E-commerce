const express = require("express");
const router = express.Router();
const AddToCarts = require("../modules/Addtocarts");

// AddToCart POST Requests.................
router.post("/addToCart", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const isExistAdd = await AddToCarts.findOne({ productId });
    if (isExistAdd) {
      res.status(400).send("Product Alredy Add To Cart");
    } else {
      const newCarts = new AddToCarts({ userId, productId });
      await newCarts.save();
      return res
        .status(200)
        .json({ message: "Product added to cart", newCarts });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// AddToCaer GET Request.......
router.get("/addToCartGet/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const addToCarts = await AddToCarts.find({ userId: userId });

    const addToCartData = Promise.all(
      addToCarts.map(async (addCart) => {
        const _id = addCart._id;
        return {
          addCart: {
            id: _id,
            userId: addCart.userId,
            productId: addCart.productId,
          },
        };
      })
    );

    res.status(200).send(await addToCartData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

// AddToCart Delete.................
router.delete("/removeFromCart/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const result = await AddToCarts.deleteOne({
      productId: productId,
    });

    if (result.deletedCount > 0) {
      res.status(200).send("Item removed from the cart successfully");
    } else {
      res.status(404).send("Item not found in the cart");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
module.exports = router;
