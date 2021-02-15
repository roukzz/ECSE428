<template>
  <div id="wrapper">
    <NavBar></NavBar>
    <div id="taskHolder">
      <table>
        <tr
          class="tasklistitems"
          v-for="(task, index) in tasklist"
          v-bind:id="task._id"
        >
          <td>
            {{ task.title }}
          </td>
          <td>
            {{ task.description }}
          </td>
          <td>
            <button
              id="editTaskButton"
              type="button"
              class="editbutton"
              @click="togglePopupEdit(task, index)"
            >
              Edit Task
            </button>
          </td>
          <td>
            <button
              id="deleteTaskButton"
              type="button"
              class="btn btn-danger"
              @click="togglePopupDelete(task, index)"
            >
              Delete
            </button>
          </td>
        </tr>
      </table>
    </div>

    <div id="buttonHolder">
      <button id="createTaskButton" v-on:click="togglePopupCreate()">
        Create Task
      </button>
    </div>

    <div class="popup" id="popup-create">
      <div class="overlay"></div>
      <div class="content" style="text-align: center">
        <div class="close-btn" @click="togglePopupCreate()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          Create a new task
        </div>
        <!-- Messages -->
        <div id="messages">
          <div
            v-if="errorCreateTask"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error"
          >
            {{ errorCreateTask }}
          </div>
          <div
            v-if="successCreateTask"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success"
          >
            {{ successCreateTask }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields">
          <div v-if="errorCreateTask && !title" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="title"
            placeholder="Task Title"
            v-model="title"
          />
          <div v-if="errorCreateTask && !description" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="description"
            placeholder="Description"
            v-model="description"
          />
          <button
            class="inpbox"
            id="createbtn"
            type="button"
            @click="addNewTask()"
          >
            Create Task
          </button>
        </div>
        <!-- <div class="close-btn" onclick="togglePopup()">&times;</div>
        
            <input class="inpbox" type="text" v-model="newNewTask" placeholder="Task Title"> 
            <br>
            <select id="taskType" v-model="tasktype">
                <option value="currentSelected">Current Selected Type</option>
                <option value="defaultType">Default Type</option>
                <option value="typeTwo">Type Two</option>
                <option value="typeThree">Type Three</option>
            </select>
            <br>
            <input class="inpbox" type="text" v-model="detail" placeholder="Task Details"> 
            <input class="inpbox" type="text" v-model="location" placeholder="Location"> 
            <input class="inpbox" type="text" v-model="deadline" placeholder="Deadline"> 
            <br>
            <br>
            <button v-on:click="addNewTask()">Click to Add</button>  -->
      </div>
    </div>

    <div class="popup" id="profile">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupProfile()">&times;</div>
        Profile
        <br /><br />
        Name
        <br /><br />
        Non-Partner University Student
        <br /><br /><br /><br />
        <button
          type="button"
          class="btn btn-danger"
          v-on:click="deleteAccount()"
          id="deleteAccount"
        >
          Delete Account
        </button>
      </div>
    </div>

    <div class="popup" id="settingsPrivacy">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupSettings()">&times;</div>
        Settings & Privacy
        <br /><br />
        Mute Notifications
        <br />
        View Settings
        <br />
        View Privacy Guidelines
        <br /><br /><br /><br />
      </div>
    </div>

    <div class="popup" id="helpSupport">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupHelp()">&times;</div>
        Profile
        <br /><br />
        Name
        <br /><br />
        Non-Partner University Student
        <br /><br /><br /><br />
      </div>
    </div>

    <div class="popup" id="popup-edit">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupEdit()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          Edit task
        </div>
        <!-- Messages -->
        <div id="messages">
          <div
            v-if="errorCreateTask"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error"
          >
            {{ errorCreateTask }}
          </div>
          <div
            v-if="successCreateTask"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success"
          >
            {{ successCreateTask }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields">
          <div v-if="errorCreateTask && !title" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="titleEdit"
            :placeholder="[[title]]"
            v-model="title"
          />
          <div v-if="errorCreateTask && !description" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="descriptionEdit"
            :placeholder="[[description]]"
            v-model="description"
          />
          <button
            id="updateChanges"
            class="inpbox"
            type="button"
            @click="editTask()"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
    <div class="popup" id="popup-delete">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupDelete()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          You are about to delete the task: {{ title }}.
          <br />
          Please confirm.
        </div>
        <!-- Messages -->
        <div id="messages">
          <div
            v-if="errorCreateTask"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error"
          >
            {{ errorCreateTask }}
          </div>
          <div
            v-if="successCreateTask"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success"
          >
            {{ successCreateTask }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields">
          <button
            class="inpbox"
            type="button"
            id="btndelete"
            @click="deleteTask()"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

export default {
  name: "Home",
  components: {
    NavBar,
  },
  data() {
    return {
      title: "",
      tasklist: [],
      tasktype: "",
      description: "",
      location: "",
      deadline: "",
      index: -1,
      errorCreateTask: "",
      successCreateTask: "",
      currenttask: null,
    };
  },

  beforeCreate() {
    let AXIOS = axios.create({
      baseURL: backendUrl,
      headers: { "auth-token": localStorage.getItem("auth_key") },
      // headers: {'Access-Control-Allow-Origin': frontendUrl}
    });
    let params = {
      username: localStorage.getItem("username"),
    };
    AXIOS.post("/api/student/getStudentByUsername", params)
      .then((response) => {
        this.tasklist = response.data.tasks;
      })
      .catch((e) => {
        e = e.response.data ? e.response.data : e;
        console.log(e);
        return;
      });
  },
  methods: {
    addNewTask() {
      if (!this.title || !this.description) {
        this.errorCreateTask =
          "Missing fields. Please fill in all required fields";
        this.successCreateTask = "";
        return;
      }
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
        title: this.title,
        description: this.description,
      };

      AXIOS.post("/api/student/addTaskToStudent", params)
        .then((response) => {
          this.errorCreateTask = "";
          this.successCreateTask = "Successful new task";
          console.log("Worked");

          // Updated tasklist is returned
          this.tasklist = response.data;

          this.title = "";
          this.description = "";
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateTask = e;
          this.successCreateTask = "";
          console.log(e);
          return;
        });

      this.togglePopupCreate();
    },

    editTask() {
      if (!this.title || !this.description) {
        this.errorCreateTask =
          "Missing fields. Please fill in all required fields";
        this.successCreateTask = "";
        return;
      }
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
        taskId: this.currenttask._id,
        title: this.title,
        description: this.description,
      };
      //console.log(this.currenttask);
      console.log(this.currenttask._id);
      AXIOS.post("/api/student/updateStudentTask", params)
        .then((response) => {
          this.errorCreateTask = "";
          this.successCreateTask = "Successful edit of task";
          console.log("Edit successful");

          // console.log(this.tasklist);

          //console.log(this.index);
          //console.log(this.tasklist[this.index]);
          // ID of task is modified when deleted
          var tasks = response.data;
          //console.log(tasks);
          //  console.log(this.title);
          this.tasklist = tasks;

          this.title = "";
          // this.tasktype = "";
          this.description = "";
          //this.location = "";
          //this.deadline = "";
          this.index = -1;
          this.currenttask = null;
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateTask = e;
          this.successCreateTask = "";
          console.log(e);
          return;
        });

      this.togglePopupEdit();
    },

    deleteTask() {
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
        taskId: this.currenttask._id,
      };

      AXIOS.post("/api/student/deleteStudentTask", params)
        .then((response) => {
          this.errorCreateTask = "";
          this.successCreateTask = "Successful deletion of task";
          console.log("Delete successful");

          // Remove element at this.index
          this.tasklist.splice(this.index, 1);

          this.title = "";
          this.description = "";
          this.index = -1;
          this.currenttask = null;
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateTask = e;
          this.successCreateTask = "";
          console.log(e);
          return;
        });

      this.togglePopupDelete();
    },

    deleteAccount() {
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      console.log(localStorage.getItem("username"));
      let params = {
        username: localStorage.getItem("username"),
      };
      console.log(params.username),
        AXIOS.post("/api/student/deleteStudentAccount", params)
          .then((response) => {
            console.log("Account deleted succesfully: " + params.username);
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            console.log(e);
            return;
          });
      localStorage.clear();
      this.$router.push("/Login");
    },
    togglePopupCreate() {
      this.errorCreateTask = "";
      this.successCreateTask = "";
      document.getElementById("popup-create").classList.toggle("active");
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
    togglePopupEdit(task, index) {
      this.errorCreateTask = "";
      this.successCreateTask = "";
      //console.log(task);
      //console.log(this.title);
      if (task != null) {
        this.title = task.title;
        this.currenttask = task;
        this.index = index;
        this.description = task.description;
      }
      //   else {
      //       this.title = "";
      //       this.description = "";
      //       this.index = -1;
      //       this.currenttask = null;
      //   }
      //console.log(this.title);
      document.getElementById("popup-edit").classList.toggle("active");
    },
    togglePopupDelete(task, index) {
      this.errorCreateTask = "";
      this.successCreateTask = "";
      //console.log(task);
      //console.log(this.title);
      if (task != null) {
        this.title = task.title;
        this.currenttask = task;
        this.index = index;
      }
      // else {
      //   this.title = "";
      //   this.description = "";
      //   this.index = -1;
      //   this.currenttask = null;
      // }
      //console.log(this.title);
      document.getElementById("popup-delete").classList.toggle("active");
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
  height: 300px;
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
  width: 35px;
  height: 35px;
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
  text-align: center;
  width: 50%;
  margin-top: 3.3%;
  border: 2px solid #222;
}

.tasklistitems td {
  padding: 5%;
}

.btndelete {
  color: red;
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
