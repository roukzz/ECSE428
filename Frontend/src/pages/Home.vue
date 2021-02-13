<template>
  <div id="wrapper">
    <NavBar></NavBar>
    <div id="taskHolder">
      <ul id="tasklistitemholder">
        <li id="tasklistitems" v-for="(task, index) in tasklist">
          {{ task.title }}
          <button type="button" id="editButton" onclick="togglePopup2()">
            Edit Task
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="removeTask(index)"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>

    <div id="buttonHolder">
      <button id="createTaskButton" v-on:click="togglePopup()">
        Create Task
      </button>
    </div>

    <div class="popup" id="popup-1">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopup()">&times;</div>

        <input
          class="inpbox"
          type="text"
          v-model="newNewTask"
          placeholder="Task Title"
        />
        <br />
        <select id="taskType" v-model="tasktype">
          <option value="currentSelected">Current Selected Type</option>
          <option value="defaultType">Default Type</option>
          <option value="typeTwo">Type Two</option>
          <option value="typeThree">Type Three</option>
        </select>
        <br />
        <input
          class="inpbox"
          type="text"
          v-model="detail"
          placeholder="Task Details"
        />
        <input
          class="inpbox"
          type="text"
          v-model="location"
          placeholder="Location"
        />
        <input
          class="inpbox"
          type="text"
          v-model="deadline"
          placeholder="Deadline"
        />
        <br />
        <br />
        <button v-on:click="addNewTask()">Click to Add</button>
      </div>
    </div>

    <div class="popup" id="popup-2">
      <div class="overlay"></div>

      <div class="content">
        <div class="close-btn" @click="togglePopup2()">&times;</div>

        <input
          class="inpbox"
          type="text"
          v-model="newNewTask"
          placeholder="Task Title"
        />
        <br />
        <select id="taskType" v-model="tasktype">
          <option value="currentSelected">Current Selected Type</option>
          <option value="defaultType">Default Type</option>
          <option value="typeTwo">Type Two</option>
          <option value="typeThree">Type Three</option>
        </select>
        <br />
        <input
          class="inpbox"
          type="text"
          v-model="detail"
          placeholder="Task Details"
        />
        <input
          class="inpbox"
          type="text"
          v-model="location"
          placeholder="Location"
        />
        <input
          class="inpbox"
          type="text"
          v-model="deadline"
          placeholder="Deadline"
        />
        <br />
        <br />
        <button>Save</button>
      </div>
    </div>

    <div class="popup" id="profile">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupProfile()">&times;</div>
            Profile
            <br><br>
            Name
            <br><br>
            Non-Partner University Student
            <br><br><br><br>
        <button type="button" class="btn btn-danger" v-on:click="deleteAccount()">Delete Account</button>
      </div>
    </div>

    <div class="popup" id="settingsPrivacy">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupSettings()">&times;</div>
            Settings & Privacy
            <br><br>
            Mute Notifications
            <br>
            View Settings
            <br>
            View Privacy Guidelines
            <br><br><br><br>
      </div>
    </div>

    <div class="popup" id="helpSupport">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupHelp()">&times;</div>
            Profile
            <br><br>
            Name
            <br><br>
            Non-Partner University Student
            <br><br><br><br>
      </div>
    </div>

  </div>
</template>


<script>
/*function togglePopup2 () {
    document.getElementById("popup-2").classList.toggle("active");
}*/

import NavBar from "@/components/NavBar";

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
  name: "Home",
  components: {
    NavBar,
  },
  data() {
    return {
      newNewTask: "",
      tasklist: [],
      tasktype: "",
      detail: "",
      location: "",
      deadline: "",
      index: "",
    };
  },
  methods: {
    addNewTask() {
      this.tasklist.push({
        title: this.newNewTask,
        tasktype: this.tasktype,
        detail: this.detail,
        location: this.location,
        deadline: this.deadline,
      });

      this.newNewTask = "";
      this.tasktype = "";
      this.detail = "";
      this.location = "";
      this.deadline = "";

      this.togglePopup();
    },
    deleteAccount() {
      let params = {
          username: localStorage.getItem("username")
        };
        AXIOS.delete("/deleteStudentAccount", params)
          .then((response) => {
            console.log("Account deleted succesfully: " + params.username)
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            console.log(e);
            return;
          });
        this.$router.push('/Login');
    },
    removeTask(index) {
      this.tasklist.splice(index, 1);
    },
    togglePopup() {
      document.getElementById("popup-1").classList.toggle("active");
    },
    togglePopupProfile() {
      document.getElementById("profile").classList.toggle("active");
    },
    togglePopupSettings() {
      document.getElementById("settingsPrivacy").classList.toggle("active");
    },
    togglePopupHelp() {
      document.getElementById("helpSupport").classList.toggle("active");
    },
  },
};
</script>



<style scoped>
#taskHolder {
  width: 60%;
  height: 150%;
  /*border: 1px solid black;*/
  margin-left: 30%;
  margin-top: 10%;
}
#buttonHolder {
  width: 100%;
  /*border: 1px solid red;*/
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.popup .overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  display: none;
}
.popup .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: #fff;
  width: 500px;
  height: 250px;
  z-index: 2;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}
.popup .close-btn {
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
  width: 30px;
  height: 30px;
  background: #222;
  color: #fff;
  font-size: 25px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
}

.popup.active .overlay {
  display: block;
}

.popup.active .content {
  transition: all 300ms ease-in-out;
  transform: translate(-50%, -50%) scale(1);
}

.class-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  font-size: 18px;
  border: 2px solid #222;
  color: #222;
  text-transform: uppercase;
  font-weight: 600;
  background: #fff;
}

.inpbox,
#taskType {
  width: 50%;
  margin-top: 3.3%;
}

#tasklistitems {
  margin-top: 5%;
}

#tasklistitemholder {
  float: left;
}
/*
#editButton {
    display: none;
    float: right;
    margin-left: 40px;
}
*/
</style>