const mongoose = require("mongoose");
const timeslot = require("./timeslot");

const task = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  timeslots: {
    type: Array,
    default: [],
    format: timeslot, //Not Sure if this will work
  },
  dueDate:{
    type:Date
  }
});

module.exports = Task = mongoose.model("Tasks", task);
