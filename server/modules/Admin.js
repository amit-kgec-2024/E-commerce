const mongoose = require("mongoose");

const adminSchame = mongoose.Schema({
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

const Admin = mongoose.model("Admin", adminSchame);

module.exports = Admin;
