<template>
  <!-- Frame div -->
  <div>
    <!-- Intro -->
    <div>
      <!-- Name -->
      <img src="../assets/logo.jpg" width="500px" height="auto" alt="mySchedule" onclick="window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')">

      <!-- Description -->
      <div id="login_intro_text">
        Welcome to mySchedule, your intelligent schedule organizer!<br/>
        <span>
          Use mySchedule to plan your weekly schedule, set up study sesssions <br/>
          with friends, get personalized schedule recommendations and much more!
        </span>
      </div>
      
      <!-- <button onClick="window.open('http://127.0.0.1:8087/#/CreateTask')">Create</button> -->
    </div>

    <!-- Form -->
    <div id="login_form">

      <div style="width:100%; text-align:center; margin-top: 20px; font-weight: bold; font-size:20px">
        Log in to mySchedule
      </div>

      <!-- Fields -->
      <div id="login_fields">
        <div id="error_msg">{{ error_msg }}</div>
        <input type="text" id="field_uname" placeholder="username" v-model="username">
        <input type="password" id="field_password" placeholder="password" v-model="password">
        <div id="password_recovery">Forgot password?</div>
        <button type="button" v-on:click="login();">Log in</button>
        <div id="create_account" v-on:click="toRegistration();">Not registered? Create account</div>
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
  name: "Login",
  data () {
    return {
      username: "",
      password: "",
      error_msg: "",
      auth_key: ""
    }
  },
  methods: {
    toRegistration() {
      this.$router.push('Signup');
    },
    login () {
      
      // Call backend to see if user credentials are valid
        // True -> navigate to home page with parameters (loginSuccess)
        // False -> display error message and stay on current page (loginFailure)
        var params = {
          username: this.username,
          password: this.password
        }

        AXIOS.post("/api/authentication/login", params)
          .then((response) => {
            console.log("Logged in successfully.")
            this.auth_key = response.data;
            // Add the auth_key and the username to current to be able to access it
            localStorage.setItem("auth_key", this.auth_key);
            localStorage.setItem("username", this.username);
            this.$router.push({name: 'Home'});
          })
          .catch((e) => {
            console.log("Log in failed.")
            e = e.response.data ? e.response.data : e;
            if (e == "Invalid username" ||
                  e == '"username" length must be at least 3 characters long') {
              this.error_msg = "Invalid username";
            }
            else if (e == "Invalid password" ||
                      e == '"password" length must be at least 6 characters long') {
              this.error_msg = "Invalid password";
            }
            console.log(e)
            return;
          });
    }
  }
};
</script>

<style scoped>

#login_intro_text {
  text-align: center;
  width: 100%;
  height: auto;
  font: arial;
  font-size: 26px;
  font-weight: bold;
}

#login_intro_text span {
  font-size: 18px;
  font-weight: normal;
}

#login_form {
  margin: 0 auto;
  margin-top: 30px;
  width: 500px;
  height: 300px;
  border: 2px solid grey;
}

#login_fields {
  margin: 0 auto;
  width: 220px;
  height: fit-content;
}

#login_fields input, #login_fields button {
  margin: 10px;
  width: calc(100% - 20px);
}

#login_fields div {
  text-align: center;
  font-size: 14px;
}

#error_msg {
  width: 100%;
  height: 21px;
  color: red;
}

#password_recovery {
  width: calc(100% - 20px);
  color: #42bff5;
  margin-top: -5px;
}

#create_account {
  width: calc(100% - 20px);
  color: #42bff5;
  margin-top: 10px;
}

#password_recovery:hover, #create_account:hover {
  cursor: pointer;
  text-decoration: underline;
}

img {
  margin: 20px;
}

img:hover {
  cursor: pointer;
}

</style>