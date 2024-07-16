const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  state_id: {
    type: Number,
    require: true,
  },
  state_name: {
    type: String,
    require: true,
  },
});

const States = mongoose.model("States", stateSchema);

module.exports = States;
