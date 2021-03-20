<template>
  <div>
    <h1>Reset Password</h1>
    <p>Please fill in this form to reset your password.</p>
    <div class="container">
      <span v-if="errorReset" style="color: red" id="error"
        >Error: {{ errorReset }}
      </span>
      <span v-if="resetSuccess" style="color: green" id="success">{{
        resetSuccess
      }}</span>
      <hr />
      <div>
        <div class="row">
          <div class="col">
            <label for="password">New Password</label>
          </div>
          <div class="col">
            <input
              type="password"
              placeholder="Enter New Password"
              name="password"
              v-model="password"
              id="password"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="passwordRepeat">Repeat Password</label>
          </div>
          <div class="col">
            <input
              type="password"
              placeholder="Repeat Password"
              name="passwordRepeat"
              v-model="passwordRepeat"
              id="passwordRepeat"
            />
          </div>
        </div>

        <button @click="toLogin()" class="cancelbtn">Cancel</button>
        <button
          @click="reset(password, passwordRepeat)"
          class="resetbtn"
          v-bind:disabled="!password || !passwordRepeat"
          id="resetbtn"
        >
          Send
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
  name: "ResetPassword",
  data() {
    return {
      password: "",
      passwordRepeat: "",
      errorReset: "",
      resetSuccess: "",
    };
  },
  created: function () {},

  methods: {
    reset: function (password, passwordRepeat) {
      var path = window.location.href;
      var pathArrays = path.split("/");
      var link = pathArrays[pathArrays.length - 1];
      if (password != passwordRepeat) {
        this.errorReset = "The passwords don't match";
        this.resetSuccess = "";
        return;
      }
      let params = {
        newPassword: password,
        resetLink: link,
      };

      AXIOS.post("/api/authentication/resetPassword", params)
        .then((response) => {
          this.errorReset = "";
          this.resetSuccess = response.data;
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorReset = e;
          this.resetSuccess = "";
          console.log(e);
          return;
        });
    },
    toLogin: function () {
      this.$router.push("/Login");
    },
  },
};
</script>

<style>
.container {
  text-align: center;
}
</style>