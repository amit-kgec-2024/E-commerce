const express = require("express");
const router = express.Router();
const PlaceOrder = require("../modules/PlaceOrder");
const Users = require("../modules/Users");
const UserAddress = require("../modules/UserAddress");
const Mobiles = require("../modules/Mobiles");

// OrderPlaced POST......................
router.post("/order/confrom", async (req, res) => {
  try {
    const {
      userId,
      firstname,
      lastname,
      email,
      mobile,
      place,
      post,
      police,
      dist,
      pin,
      state,
      img,
      title,
      models,
      price,
      stars,
      discount,
      category,
      items,
      size,
      payType,
      orderDate,
      deliveryDate,
      amountSave,
      totalAmount,
    } = req.body;

    const newPlaceOrder = new PlaceOrder({
      userId,
      firstname,
      lastname,
      email,
      mobile,
      place,
      post,
      police,
      dist,
      pin,
      state,
      img,
      title,
      models,
      price,
      stars,
      discount,
      category,
      items,
      size,
      payType,
      orderDate,
      deliveryDate,
      amountSave,
      totalAmount,
    });

    await newPlaceOrder.save();

    return res.status(200).json(newPlaceOrder);
  } catch (error) {
    console.error("Error saving place order:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// my All GET Request...................
router.get("/my/order/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const productOrders = await PlaceOrder.find({ userId: userId });
    res.status(200).json(productOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).send("Internal Server Error");
  }
});
// orders only one........................
router.get("/order/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const productOrders = await PlaceOrder.findOne({
      _id: id,
    });
    res.status(200).json(productOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
