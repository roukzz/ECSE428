<template>
  <div>
    <!-- Form -->
    <div id="create_form">

      <div style="width:100%; text-align:center; margin-top: 20px; font-weight: bold; font-size:20px">
        Create a new task
      </div>
      <!-- Messages -->
      <div id="messages">
        <span v-if="errorCreateTask" style="width:100%; color: red; text-align:center; margin: 0 auto" id="error"> {{ errorCreateTask }}</span>
        <span v-if="successCreateTask" style="width:100%;color: green; text-align:center; margin: 0 auto" id="success"> {{ successCreateTask }}</span>
        <br>
      </div>
      <!-- Fields -->
      <div id="create_fields">
        <span v-if="errorCreateTask && !title" style="color: red">* Required</span>
        <input type="text" id="title" placeholder="Task Title" v-model="title">
        <span v-if="errorCreateTask && !description" style="color: red">* Required</span>
        <input type="text" id="description" placeholder="Description" v-model="description">
        <button type="button" @click="createTask()">Create Task</button>
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
    createTask: function () {       
        console.log(this.title);
        console.log(this.description);
        if(!this.title || !this.description) {
            this.errorCreateTask="Missing fields. Please fill in all required fields";
            this.successCreateTask="";
            return;
        } else {
          this.errorCreateTask="";
          this.successCreateTask="Task Created!"
        }
        console.log(this.errorCreateTask);
    }
  }

};
</script>

<style scoped>

#create_form {
  margin: 0 auto;
  margin-top: 30px;
  width: 500px;
  height: 300px;
  border: 2px solid grey;
}

#create_fields {
  margin: 0 auto;
  margin-top: 10px;
  width: 220px;
  height: fit-content;
}

#create_fields input, #create_fields button {
  margin: 10px;
  width: calc(100% - 20px);
}

#create_fields div {
  width: calc(100% - 20px);
  text-align: center;
  color: #42bff5;
  font-size: 14px;
}

</style>