const express = require("express");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended:true
}));


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


mongoose.connect("mongodb://localhost:27017/myScheduleDB",{useNewUrlParser:true,useUnifiedTopology:true});

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged In" : "Logged out");
});


const taskSchema = {
  title: String,
  description: String
};

const Task = mongoose.model("Task",taskSchema);



//post new task
app.post("/tasks",function (req,res){

  const newTask = new Task({
    title: req.body.title,
    description:req.body.description
  })
  newTask.save(function(err){
    if(!err){
      res.send("task successuly added")
    }else {
      res.send(err);
    }
  });
});


app.route ("/tasks/:taskTitle").
// Get a specific task
get(function(req,res){
  Task.findOne({title:req.params.taskTitle},function(err,task){
    if(!err){
      res.send(task);
    }else{
      res.send(err);
    }
  });
})

// delete a specific task
.delete(function(req,res){
  Task.deleteOne({title:req.params.taskTitle},function(err){
    if (!err){
      res.send("successfly deleted task");
    }else {
      res.send(err);
    }
  });
})

.patch(function(req,res){
  Task.update({title:req.params.taskTitle},
              {$set:req.body},
              function(err){
                if (!err){
                  res.send("successfly updated task");
                } else {
                  res.send(err);
                }
              });
});




app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
