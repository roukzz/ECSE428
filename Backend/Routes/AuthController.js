const router = require("express").Router();
const Student = require("../Models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const _ = require("lodash");

// ===== Data Validation =====
// ===========================
// validation
const Joi = require("joi");
const { func } = require("joi");

// validation schema
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),

  email: Joi.string(),
});

// email transport configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASS,
  },
});

async function hashPassword(password) {
  // hash password if the student instance is newly created or if existing student wish to change password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// ===== register a new student =====
// ==================================
router.post("/register", async (req, res) => {
  // data validation
  try {
    //  console.log(req.body);
    //console.log('------------------------------------------------------');
    const value = await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }

  // checking if student is already in the database
  const studentExist = await Student.findOne({ username: req.body.username });
  if (studentExist) {
    return res.status(400).send("Student already exists");
  }

  // create new student
  const student = new Student(req.body);

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

// ===== forgot password (send email) =====
// ========================================
router.post("/forgotPassword", async (req, res) => {
  // err handlings
  if (!req.body.email) {
    return res.status(400).send("Please provide an email");
  }
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }

  const email = req.body.email;
  const username = req.body.username;

  const student = await Student.findOne({ username });
  if (!student) {
    return res.status(400).send("Student with this username does not exist");
  }

  const token = jwt.sign({ _id: student._id }, process.env.RESET_PASSWORD_KEY);

  const emailData = {
    from: process.env.APP_EMAIL,
    to: email,
    subject: "Reset Password Link (NoReply)",
    html: `<h2>Please click on given link to reset your password</h2>
    <p>${process.env.CLIENT_URL}/#/resetPassword/${token}</p>`,
  };

  return student.updateOne({ resetLink: token }, function (err, sucess) {
    if (err) {
      return res.status(400).send("Reset password link error");
    }

    // send email
    transporter.sendMail(emailData, (error, info) => {
      if (error) {
        return res.status(400).send(error);
      } else {
        return res
          .status(200)
          .send("Email has been sent. Please follow the instructions");
      }
    });
  });
});

// ===== reset password =====
// ==========================

router.post("/resetPassword", async (req, res) => {
  // err handlings
  if (!req.body.resetLink) {
    return res.status(400).send("Please provide a reset link");
  }
  if (!req.body.newPassword) {
    return res.status(400).send("Please provide a new password");
  }

  const resetLink = req.body.resetLink;
  const newPassword = req.body.newPassword;

  // verify resetLink
  jwt.verify(
    resetLink,
    process.env.RESET_PASSWORD_KEY,
    function (err, decodedData) {
      if (err) {
        return res.status(401).send("Incorrect or expired token");
      }
      // check if student with resetLink exists
      Student.findOne({ resetLink }, function (err, student) {
        if (err || !student) {
          return res.status(400).send("Student with this token does not exist");
        }

        let newPassObj = {
          password: null,
          resetLink: null,
        };

        hashPassword(newPassword).then((hash) => {
          newPassObj.password = hash;
          newPassObj.resetLink = "";

          student = _.extend(student, newPassObj);

          student.save((err, result) => {
            if (err) {
              return res.status(400).send("Reset password error:" + err);
            } else {
              return res.status(200).send("Your password has been changed");
            }
          });
        });
      });
    }
  );
});

module.exports = router;
