const mongoose = require('mongoose');

const userAddressSchema = mongoose.Schema({
  userId: {
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
});

const UserAddress = mongoose.model('UserAddress', userAddressSchema);

module.exports = UserAddress;