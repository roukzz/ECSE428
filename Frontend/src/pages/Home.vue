<template>
  <div id="wrapper">
    <NavBar></NavBar>
    <div id="taskHolder">
      <table>
        <tr
          class="tasklistitems"
          v-for="(task, index) in tasklist"
          v-bind:id="task._id"
          v-bind:key="task._id"
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

    <div id="timeSlotHolder">
      <table>
        <tr
          class="timeslotlistitems"
          v-for="(timeslot, index) in timeslotlist"
          v-bind:id="timeslot._id"
          v-bind:key="timeslot._id"
        >
          <td>
            {{ timeslot.starttime }}
          </td>
          <td>
            {{ timeslot.endtime }}
          </td>
          <td>
            {{ timeslot.description }}
          </td>
          <td>
            {{ timeslot.location }}
          </td>
          <td>
            {{ timeslot.task }}
          </td>
          <td>
            <button
              id="editTimeSlotButton"
              type="button"
              class="edittimeslotbutton"
              @click="togglePopupEditTimeSlot(timeslot, index)"
            >
              Edit Timeslot
            </button>
          </td>
          <td>
            <button
              id="deleteTimeSlotButton"
              type="button"
              class="btn btn-danger"
              @click="togglePopupDeleteTimeSlot(timeslot, index)"
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
      <button
        id="createTimeSlotButton"
        v-on:click="togglePopupCreateTimeSlot()"
      >
        Create Time Slot
      </button>
      <button
        id="createClassButton"
        v-on:click="togglePopupCreateClass()"
      >
        Create Class
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
          <div v-if="errorCreateTask && !deadline" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="deadline"
            placeHolder="YYYY-MM-DD"
            maxlength="10"
            min="2021-01-01" 
            max="3000-12-31"
            v-model="deadline"
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
      </div>
    </div>

    <div class="popup" id="popup-create-class">
      <div class="overlay"></div>
      <div class="content" style="text-align: center">
        <div class="close-btn" @click="togglePopupCreateClass()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          Create a new class
        </div>
        <!-- Messages -->
        <div id="messages">
          <div
            v-if="errorCreateClass"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error"
          >
            {{ errorCreateClass }}
          </div>
          <div
            v-if="successCreateClass"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success"
          >
            {{ successCreateClass }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields">
          <div v-if="errorCreateClass && !classname" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="classname"
            placeholder="Class Name"
            v-model="classname"
          />
          <div v-if="errorCreateClass && !startdate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="startdate"
            placeHolder="YYYY-MM-DD"
            maxlength="10"
            min="2021-01-01" 
            max="3000-12-31"
            v-model="startdate"
          />
          <div v-if="errorCreateClass && !enddate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="enddate"
            placeHolder="YYYY-MM-DD"
            maxlength="10"
            min="2021-01-01" 
            max="3000-12-31"
            v-model="enddate"
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
          <div v-if="errorCreateClass && !location" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="location"
            placeholder="Location"
            v-model="location"
          />

          <button
            class="inpbox"
            id="createclassbtn"
            type="button"
            @click="addNewClass()"
          >
            Create Class
          </button>
        </div>
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
          <div v-if="errorCreateTask && !deadline" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="deadlineEdit"
            :placeHolder="[[deadline]]"
            maxlength="10"
            min="2021-01-01" 
            max="3000-12-31"
            v-model="deadline"
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

    <div class="popup" id="popup-create-timeslot">
      <div class="overlay"></div>
      <div class="content" style="text-align: center">
        <div class="close-btn" @click="togglePopupCreateTimeSlot()">
          &times;
        </div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          Create a new time slot
        </div>
        <!-- Messages -->
        <div id="messagesTimeSlot">
          <div
            v-if="errorCreateTimeSlot"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="errorTimeSlot"
          >
            {{ errorCreateTimeSlot }}
          </div>
          <div
            v-if="successCreateTimeSlot"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="successTimeSlot"
          >
            {{ successCreateTimeSlot }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields_timeSlot">
          <div class="row">
            <div class="col-3">
              <div v-if="errorCreateTimeSlot && !starttime" style="color: red">
                * Required
              </div>
              <label for="starttime">Start Time</label>
            </div>
            <div class="col-9">
              <input
                class="inpbox"
                type="time"
                id="starttime"
                placeholder="Start Time"
                v-model="starttime"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div v-if="errorCreateTimeSlot && !endtime" style="color: red">
                * Required
              </div>
              <label for="endtime">End Time</label>
            </div>
            <div class="col-md-9">
              <input
                class="inpbox"
                type="time"
                id="endtime"
                placeholder="End Time"
                v-model="endtime"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div
                v-if="errorCreateTimeSlot && !description"
                style="color: red"
              >
                * Required
              </div>
              <label for="description">Description</label>
            </div>
            <div class="col-md-9">
              <input
                class="inpbox"
                type="text"
                id="descriptionTimeSlot"
                placeholder="Description"
                v-model="description"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div v-if="errorCreateTimeSlot && !location" style="color: red">
                * Required
              </div>
              <label for="location">Location</label>
            </div>
            <div class="col-md-9">
              <input
                class="inpbox"
                type="text"
                id="locationTimeSlot"
                placeholder="Location"
                v-model="location"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div v-if="errorCreateTimeSlot && !task" style="color: red">
                * Required
              </div>
              <label for="task">Task</label>
            </div>
            <div class="col-md-9">
              <select id="task" v-model="task">
                <option disabled value="">Please select one</option>
                <option v-for="(task, i) in tasklist" v-bind:key="`task-${i}`">
                  {{ task.title }}
                </option>
              </select>
            </div>
          </div>
          <div text-align="center">
            <div>
              <button
                class="inpbox"
                id="createbtnTimeSlot"
                type="button"
                @click="addNewTimeSlot()"
              >
                Create Time Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="popup" id="popup-edit-timeslot">
      <div class="overlay"></div>
      <div class="content" style="text-align: center">
        <div class="close-btn" @click="togglePopupEditTimeSlot()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          Edit a time slot
        </div>
        <!-- Messages -->
        <div id="messagesEditTimeSlot">
          <div
            v-if="errorEditTimeSlot"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="errorEditTimeSlot"
          >
            {{ errorEditTimeSlot }}
          </div>
          <div
            v-if="successEditTimeSlot"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="successEditTimeSlot"
          >
            {{ successEditTimeSlot }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields_edit_timeSlot">
          <div class="row">
            <div class="col-3">
              <div v-if="errorEditTimeSlot && !starttime" style="color: red">
                * Required
              </div>
              <label for="starttime">Start Time</label>
            </div>
            <div class="col-9">
              <input
                class="inpbox"
                type="time"
                id="starttimeEdit"
                :placeholder="[[starttime]]"
                v-model="starttime"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div v-if="errorEditTimeSlot && !endtime" style="color: red">
                * Required
              </div>
              <label for="endtime">End Time</label>
            </div>
            <div class="col-md-9">
              <input
                class="inpbox"
                type="time"
                id="endtimeEdit"
                :placeholder="[[endtime]]"
                v-model="endtime"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div v-if="errorEditTimeSlot && !description" style="color: red">
                * Required
              </div>
              <label for="description">Description</label>
            </div>
            <div class="col-md-9">
              <input
                class="inpbox"
                type="text"
                id="descriptionEditTimeSlot"
                :placeholder="[[description]]"
                v-model="description"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div v-if="errorEditTimeSlot && !location" style="color: red">
                * Required
              </div>
              <label for="location">Location</label>
            </div>
            <div class="col-md-9">
              <input
                class="inpbox"
                type="text"
                id="locationEditTimeSlot"
                :placeholder="[[location]]"
                v-model="location"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div v-if="errorEditTimeSlot && !task" style="color: red">
                * Required
              </div>
              <label for="task">Task</label>
            </div>
            <div class="col-md-9">
              <select id="taskEdit" v-model="task">
                <option disabled value="">Please select one</option>
                <option v-for="(task, i) in tasklist" v-bind:key="`task-${i}`">
                  {{ task.title }}
                </option>
              </select>
            </div>
          </div>
          <div text-align="center">
            <div>
              <button
                class="inpbox"
                id="editbtnTimeSlot"
                type="button"
                @click="editTimeSlot()"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="popup" id="popup-delete-timeslot">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupDeleteTimeSlot()">
          &times;
        </div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          You are about to delete the timeslot.
          <br />
          Please confirm.
        </div>
        <!-- Messages -->
        <div id="messages-delete-timeSlot">
          <div
            v-if="errorDeleteTimeSlot"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="errorDeleteTimeSlot"
          >
            {{ errorDeleteTimeSlot }}
          </div>
          <div
            v-if="successDeleteTimeSlot"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="successDeleteTimeSlot"
          >
            {{ successDeleteTimeSlot }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields_delete_timeSlot">
          <button
            class="inpbox"
            type="button"
            id="btndeleteTimeSlot"
            @click="deleteTimeSlot()"
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
      timeslotlist: [],
      tasktype: "",
      description: "",
      location: "",
      deadline: "",
      starttime: "",
      endtime: "",
      startdate: "",
      enddate: "",
      classname: "",
      task: "",
      index: -1,
      errorCreateTask: "",
      successCreateTask: "",
      errorCreateTimeSlot: "",
      successCreateTimeSlot: "",
      errorEditTimeSlot: "",
      successEditTimeSlot: "",
      errorDeleteTimeSlot: "",
      successDeleteTimeSlot: "",
      errorCreateClass: "",
      successCreateClass: "",
      currenttask: null,
      class: null,
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
        dueDate: this.deadline
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
          this.deadline = "";
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
        dueDate: this.deadline
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
          this.deadline = "";
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
    addNewTimeSlot() {
      if (
        !this.starttime ||
        !this.endtime ||
        !this.description ||
        !this.location ||
        !this.task
      ) {
        this.errorCreateTimeSlot =
          "Missing fields. Please fill in all required fields";
        this.successCreateTimeSlot = "";
        return;
      }
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
      };
      var timeslot = new Object();
      timeslot.starttime = this.starttime;
      timeslot.endtime = this.endtime;
      timeslot.description = this.description;
      timeslot.location = this.location;
      timeslot.task = this.task;
      this.timeslotlist.push(timeslot);
      this.starttime = "";
      this.endtime = "";
      this.description = "";
      this.location = "";
      this.task = "";
      this.togglePopupCreateTimeSlot();
    },
    editTimeSlot() {
      if (
        !this.starttime ||
        !this.endtime ||
        !this.description ||
        !this.location ||
        !this.task
      ) {
        this.errorEditTimeSlot =
          "Missing fields. Please fill in all required fields";
        this.successEditTimeSlot = "";
        return;
      }
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
      };
      this.timeslotlist[this.index].starttime = this.starttime;
      this.timeslotlist[this.index].endtime = this.endtime;
      this.timeslotlist[this.index].description = this.description;
      this.timeslotlist[this.index].location = this.location;
      this.timeslotlist[this.index].task = this.task;
      this.starttime = "";
      this.endtime = "";
      this.description = "";
      this.location = "";
      this.task = "";
      this.togglePopupEditTimeSlot();
    },
    deleteTimeSlot() {
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
      };
      this.timeslotlist.splice(this.index, 1);
      this.togglePopupDeleteTimeSlot();
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
      else {
        this.title = "";
        this.description = "";
      //       this.index = -1;
        this.currenttask = null;
        this.deadline = "";
      }
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
    togglePopupCreateTimeSlot() {
      this.errorCreateTimeSlot = "";
      this.successCreateTimeSlot = "";
      document
        .getElementById("popup-create-timeslot")
        .classList.toggle("active");
    },
    togglePopupEditTimeSlot(timeslot, index) {
      this.errorEditTimeSlot = "";
      this.successEditTimeSlot = "";
      if (timeslot != null) {
        this.starttime = timeslot.starttime;
        this.endtime = timeslot.endtime;
        this.description = timeslot.description;
        this.location = timeslot.location;
        this.task = timeslot.task;
        this.index = index;
      }
      document.getElementById("popup-edit-timeslot").classList.toggle("active");
    },
    togglePopupDeleteTimeSlot(timeslot, index) {
      this.errorDeleteTimeSlot = "";
      this.successDeleteTimeSlot = "";
      if (timeslot != null) {
        this.index = index;
      }
      document
        .getElementById("popup-delete-timeslot")
        .classList.toggle("active");
    },
    togglePopupCreateClass() {
      this.errorCreateClass = "";
      this.successCreateClass = "";
      document.getElementById("popup-create-class").classList.toggle("active");
    }
  },
};
</script>

<style scoped>
#taskHolder,
#timeSlotHolder {
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
  /**height: 300px;**/
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
