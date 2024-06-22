const express = require("express");
const router = express.Router();
const AddToCarts = require("../modules/Addtocarts");
const Mobiles = require("../modules/Mobiles")

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
router.get("/addToCart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const addToCarts = await AddToCarts.find({ userId: userId });

    const addToCartData = Promise.all(
      addToCarts.map(async (addCart) => {
        const _id = addCart._id;
        const product = await Mobiles.findById(addCart.productId);
        return {
          id: _id,
          userId: addCart.userId,
          productId: addCart.productId,
          category: product.category,
          discount: product.discount,
          img: product.img,
          models: product.models,
          price: product.price,
          sale: product.sale,
          stars: product.stars,
          title: product.title
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
router.delete("/removeCart/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Attempting to delete comment with ID: ${id}`);

    const result = await AddToCarts.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: "Comment not found" });
    }
      return res.status(404).send("Item not found in the cart");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});


module.exports = router;
