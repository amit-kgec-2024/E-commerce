const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  img: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  items: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  place: {
    type: String,
    require: true,
  },
  productId: {
    type: String,
    require: true,
  },
  post: {
    type: String,
    require: true,
  },
  police: {
    type: String,
    require: true,
  },
  dist: {
    type: String,
    require: true,
  },
  pin: {
    type: Number,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  mobil: {
    type: Number,
    require: true,
  },
  conformDate: {
    type: String,
    require: true,
  },
  deliveryDate: {
    type: String,
    require: true,
  },
  payment: {
    type: String,
    require: true,
  },
});

const PlaceOrders = mongoose.model("PlaceOrders", orderSchema);

module.exports = PlaceOrders;