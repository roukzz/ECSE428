const mongoose = require("mongoose");

const timeslot = new mongoose.Schema({
  startTime: {
    type: String,
    format: Date,
  },
  endTime: {
    type: String,
    format: Date,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  taskID: {
    type: String,
    format: uuid,
  },
});

module.exports = TimeSlot = mongoose.model("TimeSlot", timeslot);
