const mongoose = require("mongoose");
const timeslot = require("./timeslot");

const Class = new mongoose.Schema({
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
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
  timeslots: {
    type: Array,
    default: [],
    format: timeslot, //Not Sure if this will work
  },
});

module.exports = StudentClass = mongoose.model("Classes", Class);
