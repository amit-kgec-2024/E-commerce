const express = require("express");
const router = express.Router();
const PlaceOrders = require("../modules/PlaceOrderes");


// OrderPlaced POST......................
router.post("/buy/payment/placeorder", async (req, res) => {
  try {
    const {
      img,
      title,
      price,
      items,
      size,
      username,
      userId,
      productId,
      place,
      post,
      police,
      dist,
      pin,
      state,
      mobil,
      conformDate,
      deliveryDate,
      payment,
    } = req.body;
    const newPlaceOrder = new PlaceOrders({
      img,
      title,
      price,
      items,
      size,
      username,
      userId,
      productId,
      place,
      post,
      police,
      dist,
      pin,
      state,
      mobil,
      conformDate,
      deliveryDate,
      payment,
    });
    newPlaceOrder.save();
    return res.status(200).send("Place Order register Successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// OrderPlace GET Request...................
router.get("/buy/payment/placeorder/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productOrders = await PlaceOrders.find({
      userId: userId,
    });
    const orderData = Promise.all(
      productOrders.map(async (order) => {
        return {
          order: {
            id: order._id,
            img: order.img,
            title: order.title,
            price: order.price,
            items: order.items,
            size: order.size,
            username: order.username,
            userId: order.userId,
            productId: order.productId,
            place: order.place,
            post: order.post,
            police: order.police,
            dist: order.dist,
            pin: order.pin,
            state: order.state,
            mobil: order.mobil,
            conformDate: order.conformDate,
            deliveryDate: order.deliveryDate,
            payment: order.payment,
          },
        };
      })
    );

    res.status(200).send(await orderData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
module.exports = router;
