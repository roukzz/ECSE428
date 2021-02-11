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
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

// ===== Authentication routes =====
// =================================
app.use("/api/authentication", require("./Routes/AuthController"));

// ===== Students / Student tasks routes =====
// ===========================================
app.use("/api/student", require("./Routes/StudentController"));

module.exports = app