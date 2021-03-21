const express = require("express");
const mongoose = require("mongoose");
const Event = require("../Models/event");
const route = express.Router();
const verify = require("./VerifyToken");

route.post("/createNewEvent", verify, async function (req, res) {
  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    creatorID: req.body.creatorID,
  });
  if (newEvent.startTime > newEvent.endTime) {
    return res.status(400).send("Start of class cannot be after end of class");
  }
  if (!req.body.creatorID) {
    return res.status(400).send("Please provide a creator ID");
  }
  const savedEvent = await newEvent.save();
  res.send(savedEvent);
});
module.exports = route;
