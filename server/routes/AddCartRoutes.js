const express = require("express");
const router = express.Router();
const AddToCarts = require("../modules/Addtocarts");
const Mobiles = require("../modules/Mobiles");
const Appliances = require("../modules/Appliances");
const Beauty = require("../modules/Beauty");
const Electronics = require("../modules/Electronics");
const Furniture = require("../modules/Furniture");
const Kitchen = require("../modules/Kitchen");
const Products = require("../modules/Products");
const Grocery = require("../modules/Grocery")

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

    const addToCartData = await Promise.all(
      addToCarts.map(async (addCart) => {
        const _id = addCart._id;
        const productId = addCart.productId;

        let product =
          (await Mobiles.findById(productId)) ||
          (await Appliances.findById(productId)) ||
          (await Electronics.findById(productId)) ||
          (await Grocery.findById(productId)) ||
          (await Furniture.findById(productId)) ||
          (await Products.findById(productId)) ||
          (await Beauty.findById(productId)) ||
          (await Kitchen.findById(productId));

        if (!product) {
          return null; // Skip this product if it wasn't found in any category
        }

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
          title: product.title,
        };
      })
    );
    const validCartData = addToCartData.filter((cartItem) => cartItem !== null);

    res.status(200).json(validCartData);
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
// AddToCart Delete Heart.................
router.delete("/removeHeart/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(`Attempting to delete item with product ID: ${productId}`);

    const item = await AddToCarts.findOne({ productId });
    if (!item) {
      return res.status(404).json({ error: "Item not found in the cart" });
    }

    await AddToCarts.findByIdAndDelete(item._id);
    res.status(200).send("Item successfully removed from the cart");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
