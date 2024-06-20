const mongoose = require("mongoose");

const adminSchame = mongoose.Schema({
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
