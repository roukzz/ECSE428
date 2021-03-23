<template>
  <div>
    <h1>Recover Password</h1>
    <p>
      Please fill in this form to recover your password. An email will be sent
      containing a new password.
    </p>
    <div class="container">
      <span v-if="errorRecover" style="color: red" id="error"
        >Error: {{ errorRecover }}
      </span>
      <span v-if="recoverSuccess" style="color: green" id="success">{{
        recoverSuccess
      }}</span>
      <hr />
      <div>
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
        </div>
        <div class="row">
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

        <button @click="toLogin()" class="cancelbtn">Cancel</button>
        <button
          @click="recover(name, email)"
          class="recoverbtn"
          v-bind:disabled="!name || !email"
          id="recoverbtn"
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
  name: "RecoverPassword",
  data() {
    return {
      name: "",
      email: "",
      errorRecover: "",
      recoverSuccess: "",
    };
  },
  created: function () {},

  methods: {
    recover: function (name, email) {
      let params = {
        username: name,
        email: email,
      };

      AXIOS.post("/api/authentication/forgotPassword", params)
        .then((response) => {
          this.errorRecover = "";
          this.recoverSuccess = response.data;
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorRecover = e;
          this.recoverSuccess = "";
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