const mongoose = require("mongoose");

const event = new mongoose.Schema({
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
  },
  location: {
    type: String,
  },
  creatorID: {
    type: String,
  },
  attendeesIDs: {
    type: Array,
    default: [],
  },
});

module.exports = Event = mongoose.model("Event", event);
