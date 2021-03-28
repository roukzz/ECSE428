const express = require("express");
const mongoose = require("mongoose");
const Event = require("../Models/event");
const route = express.Router();
const verify = require("./VerifyToken");
const { ObjectId } = require("mongodb");

route.post("/createNewEvent", verify, async function (req, res) {
  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    creatorID: req.body.creatorID,
    attendeesIDs: [],
  });
  if (newEvent.startTime > newEvent.endTime) {
    return res.status(400).send("Start of event cannot be after end of event");
  }
  if (!req.body.creatorID) {
    return res.status(400).send("Please provide a creator ID");
  }
  let error; // If  there is an error, this value becomes equal to error and then doesnt send the response
  await Event.find({ creatorID: newEvent.creatorID }, function (err, docs) {
    //TIL this is an async method. Why is this an async method. That took too much time.
    if (err) {
      console.log(err);
      assert.fail();
    } else {
      for (let i = 0; i < docs.length; i++) {
        let element = docs[i];
        if (element.title == newEvent.title) {
          error = "Title is already used!";
        }
        if (
          (newEvent.startTime > element.startTime &&
            newEvent.startTime < element.endTime) ||
          (newEvent.endTime > element.startTime &&
            newEvent.endTime < element.endTime) ||
          (newEvent.startTime < element.startTime &&
            newEvent.endTime > element.endTime)
        ) {
          error =
            "This event is overlapping in its time with another created by you!";
        }
      }
    }
  });

  if (error) {
    return res.status(400).send(error);
  }

  const savedEvent = await newEvent.save();
  res.send(savedEvent);
});

route.post("/getAllEvents", verify, async function (req, res) {
  Event.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      assert.fail();
    } else {
      return res.send(docs);
    }
  });
});
route.post("/joinEvent", verify, async function (req, res) {
  Event.find({ _id: req.body.eventID }, function (err, docs) {
    if (err) {
      return res.status(400).send("Event not found");
    } else {
      docs[0].attendeesIDs.push(req.body.attendeeID);
      Event.updateOne(
        { _id: req.body.eventID },
        { attendeesIDs: docs[0].attendeesIDs },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            // console.log("Got in update");
            res.send(docs[0].attendeesIDs);
          }
        }
      );
    }
  });
});

route.post("/unjoinEvent", verify, async function (req, res) {
  if (!req.body.eventID) {
    return res.status(400).send("Please provide an event ID");
  }

  if (!req.body.attendeeID) {
    return res.status(400).send("Please provide an attendee ID");
  }
  let eventID;
  console.log(req.body.eventID);
  try {
    eventID = ObjectId(req.body.eventID);
  } catch (error) {
    return res.status(400).send("Event ID is invalid");
  }
  Event.find({ _id: eventID }, function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).send("Event Not Found");
    } else {
      if (docs.length == 0) {
        return res.status(400).send("Event Not Found");
      }
      const index = docs[0].attendeesIDs.indexOf(req.body.attendeeID);
      if (index == -1) {
        return res.status(400).send("Please provide a valid attendee ID");
      }
      docs[0].attendeesIDs.splice(index, 1);
      Event.updateOne(
        { _id: req.body.eventID },
        { attendeesIDs: docs[0].attendeesIDs },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            //console.log("Got in update");
            res.status(200).send(docs[0].attendeesIDs);
          }
        }
      );
    }
  });
});

route.post("/getStudentEvents", verify, async function (req, res) {
  Event.find({ creatorID: req.body.creatorID }, function (err, docs) {
    if (err) {
      console.log(err);
      assert.fail();
    } else {
      return res.send(docs);
    }
  });
});
route.post("/getAttendedEvents", verify, async function (req, res) {
  Event.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      assert.fail();
    } else {
      let attendedEvents = [];
      docs.forEach((event) => {
        if (event.attendeesIDs.includes(req.body.attendeeID)) {
          attendedEvents.push(event);
        }
      });
      if (attendedEvents) {
        return res.send(attendedEvents);
      } else {
        return res
          .status(400)
          .send("No events are being attended by this individual");
      }
    }
  });
});

//Update event
route.post("/updateEvent", verify, async function (req, res) {
  if (!req.body.eventID) {
    return res.status(400).send("Please provide an event ID");
  }
  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
  });
  if (newEvent.startTime > newEvent.endTime) {
    return res
      .status(400)
      .send("Start of an event cannot be after end of an event");
  }

  await Event.find({ _id: req.body.eventID }, function (err, event) {
    if (!event) {
      return res.status(400).send("Event does not exist");
    }
    if (!err) {
      Event.updateOne(
        { _id: req.body.eventID },
        {
          title: newEvent.title,
          description: newEvent.description,
          startTime: newEvent.startTime,
          endTime: newEvent.endTime,
          location: newEvent.location,
        },
        function (err) {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          } else {
            //console.log("Event updated");
            res.status(200).send(newEvent);
          }
        }
      );
    } else {
      return res.status(500).send(err);
    }
  });
});

//Delete Event
route.post("/deleteEvent", verify, async function (req, res) {
  if (!req.body.eventID) {
    return res.status(400).send("Please provide an event ID");
  }

  await Event.find({ _id: req.body.eventID }, function (err, event) {
    if (!event) {
      return res.status(400).send("Event does not exist");
    }
    if (!err) {
      Event.deleteOne({ _id: req.body.eventID }, function (err) {
        if (err) {
          console.log(err);
        } else {
          //console.log("Event deleted");
          res.send("Event has been deleted");
        }
      });
    } else {
      res.status(500).send(err);
    }
  });
});

module.exports = route;
