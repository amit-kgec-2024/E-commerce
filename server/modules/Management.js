const mongoose = require("mongoose");

const managementSchame = mongoose.Schema({
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

const Management = mongoose.model("Management", managementSchame);

module.exports = Management;
