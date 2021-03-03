const mongoose = require("mongoose");

const reminder = new mongoose.Schema({
  reminderDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = Reminder = mongoose.model("Reminders", reminder);
