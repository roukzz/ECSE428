const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

require("dotenv").config();
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

// ===== Authentication routes =====
// =================================
app.use("/api/authentication", require("./Routes/AuthController"));

// ===== Students / Student tasks routes =====
// ===========================================
app.use("/api/student", require("./Routes/StudentController"));

// ===== Class / Modify Tasks routes =====
// ===========================================
app.use("/api/class", require("./Routes/ClassController"));

// ===== Events / Modify event routes =====
// ===========================================
app.use("/api/event", require("./Routes/EventController"));

// ===== Reminder / reminders student route =====
// ===========================================

app.use("/api/reminder", require("./Routes/ReminderController"));

module.exports = app;
