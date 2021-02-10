const router = require("express").Router();
const Student = require("../Models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===== Data Validation =====
// ===========================
// validation
// TODO: Add more validation criterias so they match with gerkins
const Joi = require("joi");

// validation schema
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

// ===== register a new student =====
// ==================================
router.post("/register", async (req, res) => {
  // data validation
  try {
    const value = await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }

  // checking if student is already in the database
  const studentExist = await Student.findOne({ username: req.body.username });
  if (studentExist) {
    return res.status(400).send("Student already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new student
  const student = new Student({
    username: req.body.username,
    password: hashedPassword,
  });

  // save new student
  try {
    const savedStudent = await student.save();
    res.send(savedStudent);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ===== student login =====
// =========================
router.post("/login", async (req, res) => {
  // data validation
  try {
    const value = await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }

  // checking if student is already in the database
  const student = await Student.findOne({ username: req.body.username });
  if (!student) {
    return res.status(400).send("Invalid username");
  }

  // check password is correct
  const validPass = await bcrypt.compare(req.body.password, student.password);
  if (!validPass) {
    return res.status(403).send("Invalid password");
  }

  // create and assign a token
  const token = jwt.sign({ _id: student._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
