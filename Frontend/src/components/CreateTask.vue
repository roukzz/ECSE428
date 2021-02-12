<template>
  <div>
    <h1>Create Task</h1>
    <div class="container">
        <span v-if="errorCreateTask" style="color: red" id="error"> Error: {{ errorSignup }}</span>
        <span v-if="successCreateTask" style="color: black" id="success"> Success: {{ successCreateTask }}</span>
        <div class="col">
            <input
                type="text"
                placeholder="Task Title"
                name="tasktitle"
                v-model="tasktitle"
                id="tasktitle"
            />
            <br>
            <br>
            <input
                type="text"
                placeholder="Details"
                name="details"
                v-model="details"
                id="details"
            />
            <br>
            <br>
            <button 
                class="createbutton"
                @click="createTask(tasktitle, details)"
                id="createbtn"
            >
                Create
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
  name: "CreateTask",
  data() {
    return {
      title:"",
      description:"",
      errorCreateTask:"",
      successCreateTask:"",
    };
  },

  methods: {
    createTask: function (tasktitle,details) {
        this.errorCreateTask = "Error when trying to create";
        
    }
  }


};
</script>

<style>
.container {
  text-align: center;
}
</style>