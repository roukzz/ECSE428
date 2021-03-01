const mongoose = require("mongoose");

const reminder = new mongoose.Schema({
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
});

module.exports = Reminder = mongoose.model("Reminders", reminder);
