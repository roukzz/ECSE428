<template>
  <div>
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <div class="container">
      <span v-if="errorSignup" style="color: red" id="error"
        >Error: {{ errorSignup }}</span
      >
      <span v-if="signupSuccess" style="color: green" id="success">{{
        signupSuccess
      }}</span>
      <hr />
      <div>
        <input
          type="radio"
          name="userType"
          value="nonPartner"
          v-model="userType"
          checked
          id="nonPartner"
        />
        <label for="nonPartner">Non-Partner-University Student</label>
        <input
          type="radio"
          name="userType"
          value="partner"
          v-model="userType"
          id="partner"
        />
        <label for="partner">Partner-University Student</label>
        <br />
        <div class="row">
          <div class="col">
            <label for="name">Name</label>
          </div>
          <div class="col">
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              v-model="name"
              id="name"
            />
          </div>
          <div class="col">
            <label for="email">Email</label>
          </div>
          <div class="col">
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              v-model="email"
              id="email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="psw">Password</label>
          </div>
          <div class="col">
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              v-model="psw"
              id="psw"
            />
          </div>
          <div class="col">
            <label for="pswRepeat">Repeat Password</label>
          </div>
          <div class="col">
            <input
              type="password"
              placeholder="Repeat Password"
              name="pswRepeat"
              v-model="pswRepeat"
              id="pswRepeat"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="school" v-if="userType == 'partner'"
              >School (Partner Only)</label
            >
          </div>
          <div class="col">
            <input
              type="text"
              placeholder="Enter School"
              name="school"
              v-model="school"
              v-if="userType == 'partner'"
              id="school"
            />
          </div>
          <div class="col">
            <label for="studentID" v-if="userType == 'partner'"
              >Student ID (Partner Only)</label
            >
          </div>
          <div class="col">
            <input
              type="text"
              placeholder="Enter Student ID"
              name="studentID"
              v-model="studentID"
              v-if="userType == 'partner'"
              id="studentID"
            />
          </div>
        </div>
        <hr />

        <button @click="toLogin()" class="cancelbtn">Cancel</button>
        <button
          @click="
            signup(name, email, psw, pswRepeat, school, studentID, userType)
          "
          class="signupbtn"
          v-bind:disabled="!name || !email || !psw || !pswRepeat || !userType"
          id="signupbtn"
        >
          Sign Up
        </button>
      </div>
    </div>
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
      userType: "",
      errorSignup: "",
      signupSuccess: "",
      auth_key: "",
    };
  },
  created: function () {},

  methods: {
    signup: function (
      name,
      email,
      psw,
      pswRepeat,
      school,
      studentID,
      userType
    ) {
      var letters = /^[a-z\d\-_\s]+$/i;
      var lettersEmail = /^[a-z\d\-_\s@.]+$/i;
      if (!name.match(letters)) {
        this.errorSignup = "The name must have alphanumeric characters";
        this.signupSuccess = "";
        return;
      } else if (!email.includes("@")) {
        this.errorSignup = "The email is incorrect";
        this.signupSuccess = "";
        return;
      } else if (!email.match(lettersEmail)) {
        this.errorSignup = "The email must have alphanumeric characters";
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
      if (userType == "nonPartner") {
        school = "";
        studentID = "";
        if (school || studentID) {
          this.errorSignup =
            "Must register as a non-partner university student";
          this.signupSuccess = "";
          return;
        }
        let params = {
          username: name,
          password: psw,
        };

        AXIOS.post("/api/authentication/register", params)
          .then((response) => {
            this.errorSignup = "";
            this.signupSuccess = "Successfully Registered!";
            AXIOS.post("/api/authentication/login", params)
              .then((response) => {
                console.log("Logged in successfully.");
                this.auth_key = response.data;
                // Add the auth_key and the username to current to be able to access it
                localStorage.setItem("auth_key", this.auth_key);
                localStorage.setItem("username", this.name);
                this.$router.push({ name: "Home" });
              })
              .catch((e) => {
                console.log("Log in failed.");
                e = e.response.data ? e.response.data : e;
                console.log(e);
                return;
              });
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            this.errorSignup = e;
            this.signupSuccess = "";
            console.log(e);
            return;
          });
      } else {
        if (!school || !studentID) {
          this.errorSignup = "Must register as a partner university student";
          this.signupSuccess = "";
          return;
        }
        let params = {
          username: name,
          password: psw,
        };

        AXIOS.post("/api/authentication/register", params)
          .then((response) => {
            this.errorSignup = "";
            this.signupSuccess = "Successfully Registered!";
            AXIOS.post("/api/authentication/login", params)
              .then((response) => {
                console.log("Logged in successfully.");
                this.auth_key = response.data;
                // Add the auth_key and the username to current to be able to access it
                localStorage.setItem("auth_key", this.auth_key);
                localStorage.setItem("username", this.name);
                this.$router.push({ name: "Home" });
              })
              .catch((e) => {
                console.log("Log in failed.");
                e = e.response.data ? e.response.data : e;
                console.log(e);
                return;
              });
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            this.errorSignup = e;
            this.signupSuccess = "";
            console.log(e);
            return;
          });
      }
    },
    toLogin: function () {
      this.$router.push("Login");
    },
  },
};
</script>

<style>
.container {
  text-align: center;
}
</style>