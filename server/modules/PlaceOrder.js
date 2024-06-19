const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  productId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  addressId: {
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