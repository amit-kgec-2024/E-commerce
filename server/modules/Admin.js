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
  mobile: {
    type: Number,
    require: true,
  },
  dob: {
    type: String,
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
  profImage: {
    type: String,
    require: true,
  },
  fatherName: {
    type: String,
    require: true,
  },
  husbandName: {
    type: String,
    require: true,
  },
  briefDescription: {
    type: String,
    require: true,
  },
  qulification: {
    type: String,
    require: true,
  },
  community: {
    type: String,
    require: true,
  },
  pin: {
    type: Number,
    require: true,
  },
  permamentAddress: {
    type: String,
    require: true,
  },
  temporaryAddress: {
    type: String,
    require: true,
  },
  panNumber: {
    type: String,
    require: true,
  },
  panImage: {
    type: String,
    require: true,
  },
  aadharNumber: {
    type: String,
    require: true,
  },
  aadharImage: {
    type: String,
    require: true,
  },
  gender: {
    type: Boolean,
    require: true,
  },
  isActive: {
    type: Boolean,
    defaultValue: true,
    allowNull: false,
  },
  token: {
    type: String,
  },
});

const Admin = mongoose.model("Admin", adminSchame);

module.exports = Admin;
