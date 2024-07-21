const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobil: {
    type: Number,
    require: true,
  },
  place: {
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
  img: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  models: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  amountSave: {
    type: Number,
    require: true,
  },
  serialNo: {
    type: Number,
    require: true,
  },
  regNo: {
    type: String,
    require: true,
  },
  totalAmount: {
    type: Number,
    require: true,
  },
  stars: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
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
  payType: {
    type: String,
    require: true,
  },
  orderDate: {
    type: String,
    require: true,
  },
  deliveryDate: {
    type: String,
    require: true,
  },
});

const PlaceOrder = mongoose.model("PlaceOrder", orderSchema);

module.exports = PlaceOrder;


