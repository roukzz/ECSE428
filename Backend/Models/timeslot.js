const mongoose = require("mongoose");

const timeslot = new mongoose.Schema({
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
});

module.exports = TimeSlot = mongoose.model("TimeSlots", timeslot);
