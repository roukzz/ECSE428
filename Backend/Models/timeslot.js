const mongoose = require("mongoose");

const timeslot = new mongoose.Schema({
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
});

module.exports = TimeSlot = mongoose.model("TimeSlots", timeslot);
