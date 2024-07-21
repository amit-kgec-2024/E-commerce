const mongoose = require("mongoose");

const userSchame = mongoose.Schema({
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
  mobile: {
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
  password: {
    type: String,
    require: true,
  },
  passwords: {
    type: String,
    require: true,
  },
  gender: {
    type: Boolean,
    require: true,
  },
  token: {
    type: String,
  },
});

const Users = mongoose.model("User", userSchame);

module.exports = Users;
