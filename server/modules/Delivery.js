const mongoose = require("mongoose");

const deliverySchame = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
});

const Delivery = mongoose.model("Delivery", deliverySchame);

module.exports = Delivery;
