const mongoose = require("mongoose");

const task = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = Task = mongoose.model("Tasks", task);
