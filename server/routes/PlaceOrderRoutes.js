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
      productId,
      userId,
      addressId,
      items,
      size,
      payType,
      orderDate,
      deliveryDate,
    } = req.body;

    const newPlaceOrder = new PlaceOrder({
      productId,
      userId,
      addressId,
      items,
      size,
      payType,
      orderDate,
      deliveryDate,
    });

    await newPlaceOrder.save();

    return res.status(200).send("Place Order registered successfully");
  } catch (error) {
    console.error("Error saving place order:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Confrom..... GET Request...................
// router.get("/all/order/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const productOrders = await PlaceOrder.find({ userId: userId });

//      if (productOrders.length === 0) {
//        return res.status(404).send("No orders found for this user");
//      }
//      const lastOrder = productOrders[productOrders.length - 1];

//     res.status(200).json(lastOrder);
//   } catch (error) {
//     console.error("Error fetching user orders:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// });
router.get("/order/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const productOrders = await PlaceOrder.find({ userId: userId });

    if (productOrders.length === 0) {
      return res.status(404).send("No orders found for this user");
    }
    const user = await Users.findById(userId);
    const userAddresses = await UserAddress.find({ userId: userId });

    const userMobiles = await Mobiles.find();

    const lastOrder = productOrders[productOrders.length - 1];

    const addressId = lastOrder.addressId;
    const productId = lastOrder.productId; 

    const addressDetails = userAddresses.find((addr) =>
      addr._id.equals(addressId)
    );
    const productDetails = userMobiles.find((addrs) =>
      addrs._id.equals(productId)
    );

    if (!addressDetails) {
      return res.status(404).send("Address details not found");
    }

    const responseData = {
      lastOrder: lastOrder,
      addressDetails: addressDetails,
      productDetails: productDetails,
      user: user,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
