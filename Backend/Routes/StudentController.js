const express = require("express");
const mongoose = require("mongoose");
const Student = require("../Models/student");
const Task = require("../Models/task");
const route = express.Router();
const verify = require("./VerifyToken");
const Reminder = require("../Models/reminder");

// return custom status: res.json({status : "ok"})

// ===== get a student by username =====
// =====================================
route.post("/getStudentByUsername", verify, function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  Student.findOne({ username: req.body.username }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      res.send(student);
    } else {
      res.send(err);
    }
  });
});

// ===== delete an existing student =====
// ======================================
route.post("/deleteStudentAccount", verify, async function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  const studentName = req.body.username;

  // checking if student is already in the database
  const studentExist = await Student.findOne({ username: req.body.username });
  if (!studentExist) {
    return res.status(400).send("Student does not exist");
  }
  Student.deleteOne({ username: studentName }, function (err, student) {
    if (err) {
      res.send(err);
    } else {
      res.send("Student account has been deleted");
    }
  });
});

// ===== add a task to an existing student =====
// =============================================
route.post("/addTaskToStudent", verify, async function (req, res) {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,

    dueDate: req.body.dueDate,

  });

  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }

  const studentName = req.body.username;
  // console.log("student Name is : "+ studentName);

  Student.findOne({ username: studentName }, function (err, student) {
    //console.log("found student name  :" + student);
    if (!student) {
      return res.status(400).send("Student does not exist");
    }

    if (!err) {
      const studentTasks = student.tasks;
      //console.log("tasks" + studentTasks)

      studentTasks.push(newTask);
      // console.log("new tasks" + studentTasks)

      Student.updateOne(
        { username: studentName },
        { tasks: studentTasks },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            // console.log(
            //   "tasks of student: " + studentName + " has been updated"
            // );
            res.send(student.tasks);
          }
        }
      );
    } else {
      //console.log("student not found");
      res.send(err);
    }
  });
});

// ===== update existing student task =====
// ========================================
route.post("/updateStudentTask", verify, async function (req, res) {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,

    dueDate: req.body.dueDate,

  });
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.taskId) {
    return res.status(400).send("Please provide an taskId");
  }
  const studentName = req.body.username;
  const taskId = req.body.taskId;

  Student.findOne({ username: studentName }, function (err, student) {
    //console.log("found student name  :" + student);
    if (!student) {
      return res.status(400).send("Student does not exists");
    }

    if (!err) {
      const studentTasks = student.tasks;
      // console.log("tasks" + studentTasks);

      var taskToBeDeleted;

      studentTasks.forEach((task) => {
        if (task._id.toString() === taskId.toString()) {
          taskToBeDeleted = task;
        }
      });

      if (!taskToBeDeleted) {
        return res.status(400).send("Task does not exists");
      }
      const index = studentTasks.indexOf(taskToBeDeleted);
      // console.log(index);
      studentTasks.splice(index, 1, newTask);
      // console.log(studentTasks);

      Student.updateOne(
        { username: studentName },
        { tasks: studentTasks },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(student.tasks);
          }
        }
      );
    } else {
      //console.log("student not found");
      res.send(err);
    }
  });
});

// ===== get tasks of existing student =====
// =========================================
route.get("/getStudentTasks", verify, function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  const studentName = req.body.username;
  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exists");
    }
    // console.log("found student name  :" + student);
    if (!err) {
      res.send(student.tasks);
    } else {
      res.send(err);
    }
  });
});

// ===== delete task of an existing student =====
// ==============================================
route.post("/deleteStudentTask", verify, function (req, res) {
  const studentName = req.body.username;
  const taskId = req.body.taskId;

  if (!studentName) {
    return res.status(400).send("Please provide a username");
  }
  if (!taskId) {
    return res.status(400).send("Please provide a taskId");
  }

  Student.findOne({ username: studentName }, function (err, student) {
    //console.log("found student name  :" + student);
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      const studentTasks = student.tasks;
      //console.log("tasks" + studentTasks);

      var taskToBeDeleted = null;
      studentTasks.forEach((task) => {
        if (task._id.toString() === taskId.toString()) {
          taskToBeDeleted = task;
        }
      });

      if (!taskToBeDeleted) {
        return res.status(400).send("Task does not exist");
      }
      const index = studentTasks.indexOf(taskToBeDeleted);
      //console.log(index);
      studentTasks.splice(index, 1);
      // console.log(studentTasks);

      Student.updateOne(
        { username: studentName },
        { tasks: studentTasks },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            // console.log(
            //   "tasks of student: " + studentName + " has been updated"
            // );
            res.send(student.tasks);
          }
        }
      );
    } else {
      //console.log("student not found");
      res.send(err);
    }
  });
});

// ===== add a time slot to an existing task =====
// =============================================
route.post("/addTimeslotToTask", verify, function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.taskID) {
    return res.status(400).send("Please provide a task ID");
  }
  if (!req.body.timeslot) {
    return res.status(400).send("Please provide a timeslot");
  }
  if (!req.body.timeslot.startTime) {
    return res.status(400).send("Please provide a timeslot start time");
  }
  if (!req.body.timeslot.endTime) {
    return res.status(400).send("Please provide a timeslot end time");
  }
  if (!Date.parse(req.body.timeslot.startTime)) {
    return res
        .status(400)
        .send("Please provide a valid startTime in UTC format");
  }
  if (!Date.parse(req.body.timeslot.endTime)) {
    return res.status(400).send("Please provide a valid endTime in UTC format");
  }
  let taskID = req.body.taskID;
  let studentName = req.body.username;
  let found = false;
  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      const studentTasks = student.tasks;
      studentTasks.forEach((studentTask) => {
        if (studentTask._id.toString() === taskID.toString()) {
          found = true;
          const timeslots = studentTask.timeslots;
          const newTimeslot = new Timeslot({
            startTime: req.body.timeslot.startTime,
            endTime: req.body.timeslot.endTime,
            description: req.body.timeslot.description,
            location: req.body.timeslot.location,
          });
          timeslots.push(newTimeslot);
          studentTask.timeslots = timeslots;
          Student.updateOne(
              { username: studentName },
              { tasks: studentTasks },
              function (err) {
                if (err) {
                  return res.status(500).send(err);
                } else {
                  res.send(timeslots);
                }
              }
          );
        }
      });
    } else {
      res.status(500).send(err);
    }
    if (!found) {
      res.status(400).send("Class not found");
    }
  });
});

// get task time_slots
route.get("/getTaskTimeslots", verify, function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.taskID) {
    return res.status(400).send("Please provide a taskID");
  }
  let taskID = req.body.taskID;
  let studentName = req.body.username;
  let found = false;
  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      const studentTasks = student.tasks;
      studentTasks.forEach((studentTask) => {
        if (studentTask._id.toString() === taskID.toString()) {
          found = true;
          res.send(studentTask.timeslots);
        }
      });
    }
    if (!found) {
      res.status(400).send("Class not found");
    }
  });
});

// Update existing time slot of a task
route.post("/updateTimeSlotTask", verify, async function (req, res) {
  const newTimeSlot = new TimeSlot({
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    description: req.body.description,
    location: req.body.location,
  });

  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.timeSID) {
    return res.status(400).send("Please provide a Time Slot ID");
  }
  if (!req.body.taskID) {
    return res.status(400).send("Please provide a task ID");
  }

  if (!req.body.startTime) {
    return res.status(400).send("Please provide a timeslot start time");
  }
  if (!req.body.endTime) {
    return res.status(400).send("Please provide a timeslot end time");
  }
  if (!Date.parse(req.body.startTime)) {
    return res
        .status(400)
        .send("Please provide a valid startTime in UTC format");
  }
  if (!Date.parse(req.body.endTime)) {
    return res.status(400).send("Please provide a valid endTime in UTC format");
  }
  const studentName = req.body.username;
  const timeSlotId = req.body.timeSID;

  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exists");
    }

    var idx = -1;
    var idx2 = -1;
    var i,j;
    for(i = 0; i < student.tasks.length; i++) {
      for (j = 0; j < student.tasks[i].timeslots.length; j++) {
        if (student.tasks[i].timeslots[j]._id == timeSlotId) {
          idx = i;
          idx2 = j;
        }
      }
    }

    if(idx == -1){
      return res.status(400).send("Task does not exist");
    }

    if (!err) {

      const classT = student.tasks[idx];
      if (!classT.timeslots) {
        return res.status(400).send("TimeSlot does not exists");
      }
      classT.timeslots.splice(idx2, 1, newTimeSlot);
      Student.updateOne(
          { username: studentName },
          { tasks: classT },
          function (err) {
            if (err) {
              console.log(err);
            } else {
              res.send(student.tasks[idx]);
            }
          }
      );
    } else {
      res.send(err);
    }
  });
});

// Delete existing time slot of a task
route.post("/deleteTimeSlotTask", verify, async function (req, res) {

  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.timeSID) {
    return res.status(400).send("Please provide a Time Slot ID");
  }
  if (!req.body.taskID) {
    return res.status(400).send("Please provide a task ID");
  }

  const studentName = req.body.username;
  const timeSlotId = req.body.timeSID;

  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exists");
    }

    var idx = -1;
    var idx2 = -1;
    var i,j;
    for(i = 0; i < student.tasks.length; i++) {
      for (j = 0; j < student.tasks[i].timeslots.length; j++) {
        if (student.tasks[i].timeslots[j]._id == timeSlotId) {
          idx = i;
          idx2 = j;
        }
      }
    }

    if(idx == -1){
      return res.status(400).send("Task does not exist");
    }

    if (!err) {
      const classT = student.tasks[idx];
      if (!classT.timeslots) {
        return res.status(400).send("TimeSlot does not exists");
      }
      classT.timeslots.splice(idx2, 1);
      Student.updateOne(
          { username: studentName },
          { tasks: classT },
          function (err) {
            if (err) {
              console.log(err);
            } else {
              res.send(student.tasks[idx]);
            }
          }
      );
    } else {
      res.send(err);
    }
  });
});


module.exports = route;
