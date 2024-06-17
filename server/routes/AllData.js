// server/routes/dataRoutes.js
const express = require("express");
const router = express.Router();
const Products = require("../modules/Products");
const Mobiles = require("../modules/Mobiles");
const Appliances = require("../modules/Appliances");
const Electronics = require("../modules/Electronics");
const Beauty = require("../modules/Beauty");
const Kitchen = require("../modules/Kitchen");
const Furniture = require("../modules/Furniture");
const Grocery = require("../modules/Grocery");

router.get("/data/all-data", async (req, res) => {
  try {
    const [
      products,
      mobiles,
      appliances,
      electronics,
      beauty,
      kitchen,
      furniture,
      grocery,
    ] = await Promise.all([
      Products.find({}),
      Mobiles.find({}),
      Appliances.find({}),
      Electronics.find({}),
      Beauty.find({}),
      Kitchen.find({}),
      Furniture.find({}),
      Grocery.find({}),
    ]);

    res.status(200).json({
      products,
      mobiles,
      appliances,
      electronics,
      beauty,
      kitchen,
      furniture,
      grocery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

module.exports = router;
