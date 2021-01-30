<template>
  <div>
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <span v-if="errorSignup" style="color: red">Error: {{ errorSignup }}</span>
    <span v-if="signupSuccess" style="color: green">{{ signupSuccess }}</span>
    <hr />

    <input type="radio" name="userType" value="nonPartner" checked />
    <label for="nonPartner">Non-Partner-University Student</label>
    <input type="radio" name="userType" value="partner" />
    <label for="partner">Partner-University Student</label>
    <br />

    <label for="name">Name</label>
    <input type="text" placeholder="Enter Name" name="name" v-model="name" />

    <label for="email">Email</label>
    <input type="text" placeholder="Enter Email" name="email" v-model="email" />
    <br />

    <label for="psw">Password</label>
    <input
      type="password"
      placeholder="Enter Password"
      name="psw"
      v-model="psw"
    />

    <label for="pswRepeat">Repeat Password</label>
    <input
      type="password"
      placeholder="Repeat Password"
      name="pswRepeat"
      v-model="pswRepeat"
    />
    <br />

    <label for="school">School (Partner Only)</label>
    <input
      type="text"
      placeholder="Enter School"
      name="school"
      v-model="school"
    />

    <label for="studentID">Student ID (Partner Only)</label>
    <input
      type="text"
      placeholder="Enter Student ID"
      name="studentID"
      v-model="studentID"
    />
    <hr />

    <button type="button" class="cancelbtn">Cancel</button>
    <button
      @click="signup(name, email, psw, pswRepeat, school, studentID)"
      class="signupbtn"
      v-bind:disabled="!name || !email || !psw || !pswRepeat"
    >
      Sign Up
    </button>
  </div>
</template>

<script>
import axios from "axios";
let config = require("../../config");

let backendConfigurer = function () {
  switch (process.env.NODE_ENV) {
    case "testing":
    case "development":
      return "http://" + config.dev.backendHost + ":" + config.dev.backendPort;
    case "production":
      return (
        "https://" + config.build.backendHost + ":" + config.build.backendPort
      );
  }
};

let backendUrl = backendConfigurer();

let AXIOS = axios.create({
  baseURL: backendUrl,
  // headers: {'Access-Control-Allow-Origin': frontendUrl}
});
export default {
  name: "Registration",
  data() {
    return {
      name: "",
      email: "",
      psw: "",
      pswRepeat: "",
      school: "",
      studentID: "",
      errorSignup: "",
      signupSuccess: "",
      response: [],
    };
  },
  created: function () {},

  methods: {
    signup: function (name, email, psw, pswRepeat, school, studentID) {
      var letters = /^[0-9a-zA-Z]+$/;
      if (!name.match(letters)) {
        this.errorSignup = "The name must have alphanumeric characters";
        this.signupSuccess = "";
        return;
      } else if (!email.includes("@")) {
        this.errorSignup = "The email is incorrect";
        this.signupSuccess = "";
        return;
      } else if (psw.length < 4 || psw.length > 14) {
        this.errorSignup = "The password must be between 4 to 14 characters";
        this.signupSuccess = "";
        return;
      } else if (!psw.match(letters)) {
        this.errorSignup = "The password must have alphanumeric characters";
        this.signupSuccess = "";
        return;
      } else if (pswRepeat != psw) {
        this.errorSignup = "The passwords don't match";
        this.signupSuccess = "";
        return;
      }
      var radioButtons = document.getElementsByName("userType");
      var value;
      for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked == true) {
          value = radioButtons[i].value;
        }
      }
      if (value == "nonPartner") {
        if (school || studentID) {
          this.errorSignup =
            "Must register as a non-partner university student";
          this.signupSuccess = "";
          return;
        }
        //To be added "The email already exists"
        this.errorSignup = "";
      } else {
        if (!school || !studentID) {
          this.errorSignup = "Must register as a partner university student";
          this.signupSuccess = "";
          return;
        }
        //To be added "The email already exists"
        this.errorSignup = "";
      }
      this.signupSuccess = "Registering...";
    },
  },
};
</script>

<style>
</style>