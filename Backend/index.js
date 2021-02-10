const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./DBConnection/connection");
const { Router } = require("express");
const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

connectDB();

const port = 3000;
require("dotenv").config();

// ===== Authentication routes =====
// =================================
app.use("/api/authentication", require("./Routes/AuthController"));

// ===== Students / Student tasks routes =====
// ===========================================
app.use("/api/student", require("./Routes/StudentController"));

//app.patch(function(req,res){

//   Task.update({title:req.params.taskTitle},
//               {$set:req.body},
//               function(err){
//                 if (!err){
//                   res.send("successfly updated task");
//                 } else {
//                   res.send(err);
//                 }
//               });
// });

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
