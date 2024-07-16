const mongoose = require("mongoose");

const districtSchema = mongoose.Schema({
  state_id: {
    type: Number,
    require: true,
  },
  district_id: {
    type: Number,
    require: true,
  },
  district_name: {
    type: String,
    require: true,
  },
});

const Districts = mongoose.model("Districts", districtSchema);

module.exports = Districts;
