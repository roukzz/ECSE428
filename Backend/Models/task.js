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
<<<<<<< HEAD
  dueDate:{
    type:Date
  }
=======
  dueDate: {
    type: Date,
  },
>>>>>>> dev
});

module.exports = Task = mongoose.model("Tasks", task);
