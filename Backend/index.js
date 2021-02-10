const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./DBConnection/connection");
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

const { auth } = require("express-openid-connect");
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged In" : "Logged out");
});

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
