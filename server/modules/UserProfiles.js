const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
});

const UserProfiles = mongoose.model("UserProfiles", profileSchema);

module.exports = UserProfiles;
