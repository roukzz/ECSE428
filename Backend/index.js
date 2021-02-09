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

const studentSchema = {
  name: String,
  tasks:[taskSchema]
};


const Student = mongoose.model("Student",studentSchema);
const Task = mongoose.model("Task",taskSchema);




// add new students
app.post("/students",function (req,res){
  const newStudent = new Student({
    name: req.body.name,
    tasks:[]
  })

  newStudent.save(function(err){
    if(!err){
      res.send("student successuly added")
    }else {
      res.send(err);
    }
  });
});




app.route("/students/:studentName").
// set a specific student
get(function(req,res){
  Student.findOne({name:req.params.studentName},function(err,student){
    if(!err){
      res.send(student);
    }else{
      res.send(err);
    }
  });
});






//post new task to a specific student
app.route("/students/:studentName/tasks")

.post(function (req,res){

  const newTask = new Task({
    title: req.body.title,
    description:req.body.description
  });

  const studentName = req.params.studentName;
  //console.log("student Name is : "+ studentName);

  Student.findOne({name:studentName},function(err,student){
    //console.log("found student name  :" + student);

    if(!err){
      const studentTasks = student.tasks;

      studentTasks.push(newTask);

      Student.updateOne({name:studentName},{tasks:studentTasks},function(err){
        if (err){
          console.log(err)
        }else{
          console.log("tasks of student: "+ studentName+ " has been updated");
        }
      });
      res.send("task successfuly added to student");
    } else{
      //console.log("student not found");
      res.send(err);
    }

  });
})


// Get students tasks
.get(function(req,res){

  const studentName = req.params.studentName;
  Student.findOne({name:studentName},function(err,student){
    if(!err){
      res.send(student.tasks);
    }else{
      res.send(err);
    }
  });
})

// delete a specific task
.delete(function(req,res){

  const taskName = req.body.title;



  const studentName = req.params.studentName;

  Student.findOne({name:studentName},function(err,student){


    if(!err){
      const studentTasks = student.tasks;

      const task = studentTasks.find(element => (element.title === taskName));

      const index = studentTasks.indexOf(task);
        console.log(index);
        if(index>-1){
          studentTasks.splice(index,1);

              Student.updateOne({name:studentName},{tasks:studentTasks},function(err){
                if (err){
                  res.send(err);
                }else{
                  res.send("task has been deleted");
                }
              });
        } else{
          res.send("task doesn't exist");
        }


    }else{
      res.send(err);
    }

});
});



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
