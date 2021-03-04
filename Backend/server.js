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

// ===== Reminder / reminders student route =====
// ===========================================
<<<<<<< HEAD
//app.use("/api/reminder", require("./Routes/ReminderController"));

=======
app.use("/api/reminder", require("./Routes/ReminderController"));
>>>>>>> dev
module.exports = app;
