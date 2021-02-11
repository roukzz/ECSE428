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
  relatedStudent: String,
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
// Get a specific student

get(function(req,res){
  Student.findOne({name:req.params.studentName},function(err,student){

    if(!err){
      res.send(student);
    }else{
      console.log(err);
      res.send("student doesnt exist");
    }
  });
});







app.route("/students/:studentName/tasks")

//post new task to a specific student
.post(function (req,res){

  const newTask = new Task({
    relatedStudent: req.params.studentName,
    title: req.body.title,
    description:req.body.description
  });

  newTask.save();
  const studentName = req.params.studentName;
  Student.findOne({name:studentName},function(err,student){

    if(!err){
      const studentTasks = student.tasks;

      studentTasks.push(newTask);

      Student.updateOne({name:studentName},{tasks:studentTasks},function(err){
        if (err){
          res.send("Error");

        }else{
        res.send("task successfuly added to student");
        }
      });

      //res.send("but no task has been added");
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
      const taskId = task._id;
      const index = studentTasks.indexOf(task);
        console.log(index);
        if(index>-1){
          studentTasks.splice(index,1);

              Student.updateOne({name:studentName},{tasks:studentTasks},function(err){
                if (err){
                  res.send(err);
                }else{
                  Task.deleteOne({_id:taskId},function(err){if(!err){res.send("task has been deleted");}else{res.send(err)}});
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



//update task
app.route("/students/:studentName/tasks/:taskTitle").patch(function(req,res){
  let bool = true;
  let taskId;
  const studentName = req.params.studentName;
  const taskTitle = req.params.taskTitle;

  let updatedTask=  new Task() ;

 Task.findOne({relatedStudent:studentName,title:taskTitle},function(err,task){

    if(!err && task != null){
      taskId = task._id;
      Task.update({_id:taskId},{$set:req.body},function(err){
            if (!err){
            Task.findOne({_id:taskId},function(err,task){
                  if(!err && task !=null){
                  updatedTask.relatedStudent =task.relatedStudent;
                  updatedTask.title = task.title;
                  updatedTask.description = task.description;

                      Student.findOne({name:studentName},function(err,student){
                              if(!err){
                              const studentTasks = student.tasks;
                              const task = studentTasks.find(element => (element.title === taskTitle));
                              const index = studentTasks.indexOf(task);
                              if(index>-1){
                              studentTasks.splice(index,1,updatedTask);
                              Student.updateOne({name:studentName},{tasks:studentTasks},function(err){
                                      if (err){
                                      res.send(err);
                                    }else{
                                      res.send("task has been UPDATED");
                                    }
                              });
                              } else{
                              res.send("task doesn't exist");
                              }
                              }else{
                              res.send(err);
                              }
                        });

                    }else {
                    res.send(err);
                    }
                });
              } else {
                res.send(err);
              }
          });

    } else {
      res.send("task doesnt exist");
    }

  });

});




app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
