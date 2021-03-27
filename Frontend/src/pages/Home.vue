<template>
  <div id="wrapper">
    <NavBar></NavBar>

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
      <button id="createClassButton" v-on:click="togglePopupCreateClass()">
        Create Class
      </button>
      <button
        id="createReminderButton"
        v-on:click="togglePopupCreateReminder()"
      >
        Create Reminder
      </button>
      <button id="createEventButton" v-on:click="togglePopupCreateEvent()">
        Create Event
      </button>
      <button id="joinEventButton" v-on:click="togglePopupJoinEvent()">
        Join Event
      </button>
    </div>

    <div id="calendarHolder">
      <Calendar
        :tasks="this.tasklist"
        :timeslots="timeslotlist"
        :classes="classeslist"
      ></Calendar>
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
            type="datetime-local"
            id="deadline"
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
            id="createclass-classname"
            placeholder="Class Name"
            v-model="classname"
          />
          <div v-if="errorCreateClass && !startdate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="createclass-startdate"
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
            id="createclass-enddate"
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
            id="createclass-description"
            placeholder="Description"
            v-model="description"
          />
          <div v-if="errorCreateClass && !location" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="createclass-location"
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

    <div class="popup" id="popup-edit-class">
      <div class="overlay"></div>
      <div class="content" style="text-align: center">
        <div class="close-btn" @click="togglePopupEditClass()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          Edit class
        </div>
        <!-- Messages -->
        <div id="messages">
          <div
            v-if="errorEditClass"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="errorEditClass"
          >
            {{ errorEditClass }}
          </div>
          <div
            v-if="successEditClass"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="successEditClass"
          >
            {{ successEditClass }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields">
          <div v-if="errorEditClass && !classname" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="editclass-classname"
            :placeholder="[[classname]]"
            v-model="classname"
          />
          <div v-if="errorEditClass && !startdate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="editclass-startdate"
            :placeHolder="[[startdate]]"
            min="2021-01-01"
            max="3000-12-31"
            v-model="startdate"
          />
          <div v-if="errorEditClass && !enddate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="editclass-enddate"
            :placeHolder="[[enddate]]"
            min="2021-01-01"
            max="3000-12-31"
            v-model="enddate"
          />
          <div v-if="errorEditTask && !description" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="editclass-description"
            :placeholder="[[description]]"
            v-model="description"
          />
          <div v-if="errorEditClass && !location" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="editclass-location"
            :placeholder="[[location]]"
            v-model="location"
          />

          <button
            class="inpbox"
            id="editclassbtn"
            type="button"
            @click="editClass()"
          >
            Edit Class
          </button>
        </div>
      </div>
    </div>

    <div class="popup" id="popup-delete-class">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupDeleteClass()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          You are about to delete the class: {{ classname }}.
          <br />
          Please confirm.
        </div>
        <!-- Messages -->
        <div id="messages-delete-class">
          <div
            v-if="errorDeleteClass"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error"
          >
            {{ errorDeleteClass }}
          </div>
          <div
            v-if="successDeleteClass"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success-delete-class"
          >
            {{ successDeleteClass }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields-delete-class">
          <button
            class="inpbox"
            type="button"
            id="btndeleteclass"
            @click="deleteClass()"
          >
            Confirm Delete
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

        <!-- Messages -->
        <div id="messages">
          <div
            v-if="errorEditCredentials"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error"
          >
            {{ errorEditCredentials }}
          </div>
          <div
            v-if="successEditCredentials"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success"
          >
            {{ successEditCredentials }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields">
          Email
          <br />
          <div v-if="errorEditCredentials && !email" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="emailEdit"
            :placeholder="[[email]]"
            v-model="email"
          />
          <br /><br />
          Password
          <br />
          <div v-if="errorEditTask && !password" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="password"
            id="passwordEdit"
            :placeholder="[[password]]"
            v-model="password"
          />
        </div>
        <br /><br />
        <button
          type="button"
          class="button"
          v-on:click="editUserCredentials()"
          id="updateUserCredentials"
        >
          Edit User Credentials
        </button>
        <br /><br />
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
        <div class="close-btn" @click="togglePopupEditTask()">&times;</div>
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
            type="datetime-local"
            id="deadlineEdit"
            :placeHolder="[[deadline]]"
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
        <div class="close-btn" @click="togglePopupDeleteTask()">&times;</div>
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
          <div text-align="center">
            <div>
              <input
                type="radio"
                name="taskOrClass"
                value="task"
                v-model="taskOrClass"
                checked
                id="taskForTimeSlot"
              />
              <label for="task">Task</label>
              <input
                type="radio"
                name="taskOrClass"
                value="class"
                v-model="taskOrClass"
                id="classForTimeSlot"
              />
              <label for="class">Class</label>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <div v-if="errorCreateTimeSlot && !startTime" style="color: red">
                * Required
              </div>
              <label for="startTime">Start Time</label>
            </div>
            <div class="col-9">
              <input
                class="inpbox"
                type="datetime-local"
                id="startTime"
                placeholder="Start Time"
                v-model="startTime"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div v-if="errorCreateTimeSlot && !endTime" style="color: red">
                * Required
              </div>
              <label for="endTime">End Time</label>
            </div>
            <div class="col-md-9">
              <input
                class="inpbox"
                type="datetime-local"
                id="endTime"
                placeholder="End Time"
                v-model="endTime"
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
          <div class="row" v-if="taskOrClass == 'class'">
            <div class="col-md-3">
              <div
                v-if="errorCreateTimeSlot && !classSelected"
                style="color: red"
              >
                * Required
              </div>
              <label for="class">Class</label>
            </div>
            <div class="col-md-9">
              <select id="class" v-model="classSelected">
                <option disabled value="">Please select one</option>
                <option
                  v-for="(classSelected, i) in classeslist"
                  v-bind:key="`class-${i}`"
                >
                  {{ classSelected.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="row" v-if="taskOrClass == 'task'">
            <div class="col-md-3">
              <div
                v-if="errorCreateTimeSlot && !taskSelected"
                style="color: red"
              >
                * Required
              </div>
              <label for="task">Task</label>
            </div>
            <div class="col-md-9">
              <select id="task" v-model="taskSelected">
                <option disabled value="">Please select one</option>
                <option
                  v-for="(taskSelected, i) in tasklist"
                  v-bind:key="`task-${i}`"
                >
                  {{ taskSelected.title }}
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
              <div v-if="errorEditTimeSlot && !startTime" style="color: red">
                * Required
              </div>
              <label for="startTime">Start Time</label>
            </div>
            <div class="col-9">
              <input
                class="inpbox"
                type="datetime-local"
                id="startTimeEdit"
                :placeholder="[[startTime]]"
                v-model="startTime"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div v-if="errorEditTimeSlot && !endTime" style="color: red">
                * Required
              </div>
              <label for="endTime">End Time</label>
            </div>
            <div class="col-md-9">
              <input
                class="inpbox"
                type="datetime-local"
                id="endTimeEdit"
                :placeholder="[[endTime]]"
                v-model="endTime"
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
          <div class="row" v-if="classSelected">
            <div class="col-md-3">
              <div
                v-if="errorCreateTimeSlot && !classSelected"
                style="color: red"
              >
                * Required
              </div>
              <label for="class">Class</label>
            </div>
            <div class="col-md-9">
              {{ classSelected }}
            </div>
          </div>
          <div class="row" v-if="taskSelected">
            <div class="col-md-3">
              <div v-if="errorEditTimeSlot && !taskSelected" style="color: red">
                * Required
              </div>
              <label for="task">Task</label>
            </div>
            <div class="col-md-9">
              {{ taskSelected }}
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

    <div class="popup" id="popup-create-reminder">
      <div class="overlay"></div>
      <div class="content" style="text-align: center">
        <div class="close-btn" @click="togglePopupCreateReminder()">
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
          Create a new reminder
        </div>
        <!-- Messages -->
        <div id="messages">
          <div
            v-if="errorCreateReminder"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error"
          >
            {{ errorCreateReminder }}
          </div>
          <div
            v-if="successCreateReminder"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success"
          >
            {{ successCreateReminder }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields">
          <div v-if="errorCreateReminder && !title" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="titleReminder"
            placeholder="Reminder Title"
            v-model="title"
          />
          <div v-if="errorCreateReminder && !description" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="descriptionReminder"
            placeholder="Description"
            v-model="description"
          />
          <div v-if="errorCreateReminder && !deadline" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="datetime-local"
            id="deadlineReminder"
            placeHolder="YYYY-MM-DD"
            maxlength="10"
            min="2021-01-01"
            max="3000-12-31"
            v-model="deadline"
          />

          <button
            class="inpbox"
            id="createbtnReminder"
            type="button"
            @click="addNewReminder()"
          >
            Create Reminder
          </button>
        </div>
      </div>
    </div>

    <div class="popup" id="reminder">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupReminder()">&times;</div>
        Reminders
        <br />

        <div
          id="Reminders"
          style="height: 250px; width: 650px; overflow-y: auto"
        >
          <table>
            <tr
              class="tasklistitems"
              v-for="reminder in reminderlist"
              v-bind:id="reminder._id"
              v-bind:key="reminder._id"
            >
              <td>
                {{ reminder.title }}
              </td>
              <td>
                {{ reminder.description }}
              </td>
              <td>
                {{ reminder.reminderDate }}
              </td>
              <td>
                <button
                  id="eReminderButton"
                  type="button"
                  class="editbutton"
                  @click="togglePopupEditReminder(reminder)"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  id="deleteReminderButton"
                  type="button"
                  class="btn btn-danger"
                  @click="togglePopupDeleteReminder(reminder)"
                >
                  Delete Reminder
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="popup" id="popup-edit-reminder">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupEditReminder()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          Edit Reminder
        </div>
        <!-- Messages -->
        <div id="messages">
          <div
            v-if="errorCreateReminder"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error"
          >
            {{ errorCreateReminder }}
          </div>
          <div
            v-if="successCreateReminder"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success"
          >
            {{ successCreateReminder }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields">
          <div v-if="errorCreateReminder && !title" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="titleEditReminder"
            :placeholder="[[title]]"
            v-model="title"
          />
          <div v-if="errorCreateReminder && !description" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="descriptionEditReminder"
            :placeholder="[[description]]"
            v-model="description"
          />
          <div v-if="errorCreateReminder && !reminderDate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="datetime-local"
            id="deadlineEditReminder"
            :placeHolder="[[reminderDate]]"
            maxlength="10"
            min="2021-01-01"
            max="3000-12-31"
            v-model="deadline"
          />
          <button
            id="updateChangesReminder"
            class="inpbox"
            type="button"
            @click="editReminder()"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <div class="popup" id="popup-delete-reminder">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupDeleteReminder()">
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
          You are about to delete the reminder: {{ title }}.
          <br />
          Please confirm.
        </div>
        <!-- Messages -->
        <div id="messages">
          <div
            v-if="errorCreateReminder"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error"
          >
            {{ errorCreateReminder }}
          </div>
          <div
            v-if="successCreateReminder"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success"
          >
            {{ successCreateReminder }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields">
          <button
            class="inpbox"
            type="button"
            id="btndeleteReminder"
            @click="deleteReminder()"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>

    <div class="popup" id="popup-create-event">
      <div class="overlay"></div>
      <div class="content" style="text-align: center">
        <div class="close-btn" @click="togglePopupCreateEvent()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          Create a new event
        </div>
        <!-- Messages -->
        <div id="messages-create-event">
          <div
            v-if="errorCreateEvent"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error-create-event"
          >
            {{ errorCreateEvent }}
          </div>
          <div
            v-if="successCreateEvent"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success-create-event"
          >
            {{ successCreateEvent }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields-create-event">
          <div v-if="errorCreateEvent && !classname" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="title-create-event"
            placeholder="Event Title"
            v-model="title"
          />
          <div v-if="errorCreateEvent && !startdate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="startdate-create-event"
            placeHolder="YYYY-MM-DD"
            maxlength="10"
            min="2021-01-01"
            max="3000-12-31"
            v-model="startdate"
          />
          <div v-if="errorCreateEvent && !enddate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="enddate-create-event"
            placeHolder="YYYY-MM-DD"
            maxlength="10"
            min="2021-01-01"
            max="3000-12-31"
            v-model="enddate"
          />
          <div v-if="errorCreateEvent && !description" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="description-create-event"
            placeholder="Description"
            v-model="description"
          />
          <div v-if="errorCreateEvent && !location" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="location-create-event"
            placeholder="Location"
            v-model="location"
          />

          <button
            class="inpbox"
            id="createeventbtn"
            type="button"
            @click="addNewEvent()"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>

    <div class="popup" id="popup-edit-event">
      <div class="overlay"></div>
      <div class="content" style="text-align: center">
        <div class="close-btn" @click="togglePopupEditEvent()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          Edit event
        </div>
        <!-- Messages -->
        <div id="messages-edit-event">
          <div
            v-if="errorEditEvent"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error-edit-event"
          >
            {{ errorEditEvent }}
          </div>
          <div
            v-if="successEditEvent"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success-edit-event"
          >
            {{ successEditEvent }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields-edit-event">
          <div v-if="errorEditEvent && !classname" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="title-edit-event"
            :placeholder="[[title]]"
            v-model="title"
          />
          <div v-if="errorEditEvent && !startdate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="startdate-edit-event"
            :placeHolder="[[startdate]]"
            min="2021-01-01"
            max="3000-12-31"
            v-model="startdate"
          />
          <div v-if="errorEditEvent && !enddate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="date"
            id="enddate-edit-event"
            :placeHolder="[[enddate]]"
            min="2021-01-01"
            max="3000-12-31"
            v-model="enddate"
          />
          <div v-if="errorEditEvent && !description" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="description-edit-event"
            :placeholder="[[description]]"
            v-model="description"
          />
          <div v-if="errorEditEvent && !location" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="location-edit-event"
            :placeholder="[[location]]"
            v-model="location"
          />

          <button
            class="inpbox"
            id="editeventbtn"
            type="button"
            @click="editEvent()"
          >
            Edit Event
          </button>
        </div>
      </div>
    </div>

    <div class="popup" id="popup-delete-event">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupDeleteEvent()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          You are about to delete the event: {{ title }}.
          <br />
          Please confirm.
        </div>
        <!-- Messages -->
        <div id="messages-delete-event">
          <div
            v-if="errorDeleteEvent"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error-delete-event"
          >
            {{ errorDeleteEvent }}
          </div>
          <div
            v-if="successDeleteEvent"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success-delete-event"
          >
            {{ successDeleteEvent }}
          </div>
        </div>
        <!-- Fields -->
        <div id="create_fields-delete-event">
          <button
            class="inpbox"
            type="button"
            id="btndeleteevent"
            @click="deleteEvent()"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>

    <div class="popup" id="popup-join-event">
      <div class="overlay"></div>
      <div class="content">
        <div class="close-btn" @click="togglePopupJoinEvent()">&times;</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          Join Event
        </div>
        <!-- Messages -->
        <div id="messages-join-event">
          <div
            v-if="errorJoinEvent"
            style="width: 100%; color: red; text-align: center; margin: 0 auto"
            id="error-join-event"
          >
            {{ errorJoinEvent }}
          </div>
          <div
            v-if="successJoinEvent"
            style="
              width: 100%;
              color: green;
              text-align: center;
              margin: 0 auto;
            "
            id="success-join-event"
          >
            {{ successJoinEvent }}
          </div>
        </div>

        <!-- Fields -->
        <div id="create_fields-join-event">
          <div
            class="row"
            v-for="(event, i) in eventlist"
            v-bind:key="`event-${i}`"
          >
            <div class="col">
              {{ event.title }}
            </div>
            <div class="col">
              {{ event.description }}
            </div>
            <div class="col">
              {{ event.startTime }}
            </div>
            <div class="col">
              {{ event.endTime }}
            </div>
          </div>

          <select id="event" v-model="eventSelected">
            <option disabled value="">Please select one</option>
            <option
              v-for="(eventSelected, i) in eventlist"
              v-bind:key="`event-${i}`"
            >
              {{ eventSelected.title }}
            </option>
          </select>
          <button
            v-if="eventSelected"
            class="inpbox"
            type="button"
            id="btnjoinevent"
            @click="joinEvent()"
          >
            Confirm Join
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import axios from "axios";
import moment from "moment";
import Calendar from "@/components/Calendar.vue";

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
    Calendar,
  },
  data() {
    return {
      studentid: "",
      email: "",
      password: "",
      title: "",
      tasklist: [],
      timeslotlist: [],
      classeslist: [],
      reminderlist: [],
      myevents: [],
      attendedevents: [],
      eventlist: [],
      tasktype: "",
      description: "",
      reminderDate: "",
      location: "",
      deadline: "",
      startdate: "",
      enddate: "",
      classname: "",
      startTime: "",
      endTime: "",
      taskSelected: "",
      classSelected: "",
      eventSelected: "",
      taskOrClass: "",
      errorCreateTask: "",
      successCreateTask: "",
      errorEditTask: "",
      successEditTask: "",
      errorDeleteTask: "",
      successDeleteTask: "",
      errorCreateTimeSlot: "",
      successCreateTimeSlot: "",
      errorEditTimeSlot: "",
      successEditTimeSlot: "",
      errorDeleteTimeSlot: "",
      successDeleteTimeSlot: "",
      errorCreateClass: "",
      successCreateClass: "",
      errorEditClass: "",
      successEditClass: "",
      errorDeleteClass: "",
      successDeleteClass: "",
      successCreateReminder: "",
      errorCreateReminder: "",
      successEditReminder: "",
      errorEditReminder: "",
      successDeleteReminder: "",
      errorDeleteReminder: "",
      successCreateEvent: "",
      errorCreateEvent: "",
      successEditEvent: "",
      errorEditEvent: "",
      successDeleteEvent: "",
      errorDeleteEvent: "",
      successEditCredentials: "",
      errorEditCredentials: "",
      successJoinEvent: "",
      errorJoinEvent: "",
      currentTask: null,
      currentTimeSlot: null,
      curClass: null,
      curEvent: null,
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
        this.studentid = response.data._id;
        this.email = response.data.email;
        this.password = "password";
        // console.log(this.password);
        this.tasklist = response.data.tasks;
        this.classeslist = response.data.classes;
        this.reminderlist = response.data.reminders;
        for (let reminder of this.reminderlist) {
          reminder.reminderDate = moment(reminder.reminderDate).format(
            "YYYY-MM-DDTkk:mm"
          );
        }
        this.timeslotlist = [];
        for (let task of this.tasklist) {
          let params = {
            username: localStorage.getItem("username"),
            taskID: task._id,
          };
          task.dueDate = moment(task.dueDate).format("YYYY-MM-DDTkk:mm");
          AXIOS.post("/api/student/getTaskTimeslots", params)
            .then((response) => {
              var timeslots = response.data;
              for (let timeslot of timeslots) {
                timeslot.startTime = moment(timeslot.startTime).format(
                  "YYYY-MM-DDTkk:mm"
                );
                timeslot.endTime = moment(timeslot.endTime).format(
                  "YYYY-MM-DDTkk:mm"
                );
                timeslot.task = task;
              }
              this.timeslotlist.push(...timeslots);
            })
            .catch((e) => {
              e = e.response.data ? e.response.data : e;
              console.log(e);
              return;
            });
        }
        for (let classe of this.classeslist) {
          let params = {
            username: localStorage.getItem("username"),
            classID: classe._id,
          };
          classe.startTime = moment(classe.startTime).format(
            "YYYY-MM-DDTkk:mm"
          );
          classe.endTime = moment(classe.endTime).format("YYYY-MM-DDTkk:mm");
          AXIOS.post("/api/class/getClassTimeslots", params)
            .then((response) => {
              var timeslots = response.data;
              for (let timeslot of timeslots) {
                timeslot.startTime = moment(timeslot.startTime).format(
                  "YYYY-MM-DDTkk:mm"
                );
                timeslot.endTime = moment(timeslot.endTime).format(
                  "YYYY-MM-DDTkk:mm"
                );
                timeslot.class = classe;
              }
              this.timeslotlist.push(...timeslots);
            })
            .catch((e) => {
              e = e.response.data ? e.response.data : e;
              console.log(e);
              return;
            });
        }
        let params = {
          creatorID: this.studentid,
        };
        AXIOS.post("/api/event/getStudentEvents", params)
          .then((response) => {
            this.myevents = response.data;
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            console.log(e);
            return;
          });
        AXIOS.post("/api/event/getAllEvents")
          .then((response) => {
            this.eventlist = response.data;
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            console.log(e);
            return;
          });
      })
      .catch((e) => {
        e = e.response.data ? e.response.data : e;
        console.log(e);
        return;
      });
  },
  methods: {
    addNewTask() {
      if (!this.title || !this.description || !this.deadline) {
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
        dueDate: this.deadline,
      };

      AXIOS.post("/api/student/addTaskToStudent", params)
        .then((response) => {
          this.errorCreateTask = "";
          this.successCreateTask = "Successful new task";

          this.updatePage();

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
      if (!this.title || !this.description || !this.deadline) {
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
        taskId: this.currentTask._id,
        title: this.title,
        description: this.description,
        dueDate: this.deadline,
      };
      AXIOS.post("/api/student/updateStudentTask", params)
        .then((response) => {
          this.errorCreateTask = "";
          this.successCreateTask = "Successful edit of task";

          this.updatePage();

          this.title = "";
          this.description = "";
          this.deadline = "";
          this.currentTask = null;
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateTask = e;
          this.successCreateTask = "";
          console.log(e);
          return;
        });

      this.togglePopupEditTask();
    },
    deleteTask() {
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
        taskId: this.currentTask._id,
      };

      AXIOS.post("/api/student/deleteStudentTask", params)
        .then((response) => {
          this.errorCreateTask = "";
          this.successCreateTask = "Successful deletion of task";

          this.updatePage();

          this.title = "";
          this.description = "";
          this.currentTask = null;
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateTask = e;
          this.successCreateTask = "";
          console.log(e);
          return;
        });

      this.togglePopupDeleteTask();
    },
    addNewClass() {
      if (
        !this.classname ||
        !this.description ||
        !this.location ||
        !this.startdate ||
        !this.enddate
      ) {
        this.errorCreateClass =
          "Missing fields. Please fill in all required fields";
        this.successCreateClass = "";
        return;
      }
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
        title: this.classname,
        description: this.description,
        startTime: this.startdate,
        endTime: this.enddate,
        location: this.location,
        timeslots: null,
      };

      AXIOS.post("/api/Class/addNewClass", params)
        .then((response) => {
          this.errorCreateClass = "";
          this.successCreateClass = "Successful new class";

          this.updatePage();

          this.classname = "";
          this.description = "";
          this.startTime = "";
          this.endTime = "";
          this.location = "";
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateTask = e;
          this.successCreateTask = "";
          console.log(e);
          return;
        });

      this.togglePopupCreateClass();
    },
    editClass() {
      if (
        !this.classname ||
        !this.description ||
        !this.location ||
        !this.startdate ||
        !this.enddate
      ) {
        this.errorEditClass =
          "Missing fields. Please fill in all required fields";
        this.successEditClass = "";
        return;
      }
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
        classID: this.curClass._id,
        title: this.classname,
        description: this.description,
        startTime: this.startdate,
        endTime: this.enddate,
        location: this.location,
        timeslots: null,
      };

      AXIOS.post("/api/Class/updateClass", params)
        .then((response) => {
          this.errorEditClass = "";
          this.successEditClass = "Successful update class";

          this.updatePage();

          this.classname = "";
          this.description = "";
          this.startTime = "";
          this.endTime = "";
          this.location = "";
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateTask = e;
          this.successCreateTask = "";
          console.log(e);
          return;
        });

      this.togglePopupEditClass();
    },
    deleteClass() {
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });

      let params = {
        username: localStorage.getItem("username"),
        classID: this.curClass._id,
      };

      AXIOS.post("/api/Class/deleteClass", params)
        .then((response) => {
          this.errorDeleteTask = "";
          this.successDeleteTask = "Successful deletion of class";

          this.updatePage();

          this.classname = "";
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateTask = e;
          this.successCreateTask = "";
          console.log(e);
          return;
        });

      this.togglePopupDeleteClass();
    },
    deleteAccount() {
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
      };
      AXIOS.post("/api/student/deleteStudentAccount", params)
        .then((response) => {})
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          console.log(e);
          return;
        });
      localStorage.clear();
      this.$router.push("/Login");
    },
    editUserCredentials() {
      if (!this.email || !this.password) {
        this.errorEditCredentials =
          "Missing fields. Please fill in all required fields";
        this.successEditCredentials = "";
        return;
      }
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
        newEmail: this.email,
        newPassword: this.password,
      };
      AXIOS.post("/api/student/editStudentInfo", params)
        .then((response) => {
          this.errorEditCredentials = "";
          this.successEditCredentials = "Successful edit of user credentials";

          this.updatePage();

          this.email = "";
          this.password = "";
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorEditCredentials = e;
          this.successEditCredentials = "";
          console.log(e);
          return;
        });

      this.togglePopupProfile();
    },
    addNewTimeSlot() {
      if (
        !this.startTime ||
        !this.endTime ||
        !this.description ||
        !this.location ||
        (!this.taskSelected && !this.classSelected)
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
      var timeslot = new Object();
      timeslot.startTime = this.startTime;
      timeslot.endTime = this.endTime;
      timeslot.description = this.description;
      timeslot.location = this.location;
      if (this.taskOrClass == "task") {
        timeslot.task = this.tasklist.find(
          (element) => element.title == this.taskSelected
        );
      } else {
        timeslot.class = this.classeslist.find(
          (element) => element.title == this.classSelected
        );
      }
      if (this.taskOrClass == "task") {
        let params = {
          username: localStorage.getItem("username"),
          taskID: timeslot.task._id,
          timeslot: timeslot,
        };
        AXIOS.post("/api/student/addTimeslotToTask", params)
          .then((response) => {
            this.errorCreateTimeSlot = "";
            this.successCreateTimeSlot = "Successful new time slot";

            this.updatePage();

            this.startTime = "";
            this.endTime = "";
            this.description = "";
            this.location = "";
            this.taskSelected = "";
            this.classSelected = "";
            this.togglePopupCreateTimeSlot();
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            this.errorCreateTimeSlot = e;
            this.successCreateTimeSlot = "";
            console.log(e);
            return;
          });
      } else {
        let params = {
          username: localStorage.getItem("username"),
          classID: timeslot.class._id,
          timeslot: timeslot,
        };
        AXIOS.post("/api/class/addTimeslotToClass", params)
          .then((response) => {
            this.errorCreateTimeSlot = "";
            this.successCreateTimeSlot = "Successful new time slot";

            this.updatePage();

            this.startTime = "";
            this.endTime = "";
            this.description = "";
            this.location = "";
            this.taskSelected = "";
            this.classSelected = "";
            this.togglePopupCreateTimeSlot();
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            this.errorCreateTimeSlot = e;
            this.successCreateTimeSlot = "";
            console.log(e);
            return;
          });
      }
    },
    editTimeSlot() {
      if (
        !this.startTime ||
        !this.endTime ||
        !this.description ||
        !this.location ||
        (!this.taskSelected && !this.classSelected)
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
      if (this.taskSelected) {
        let params = {
          username: localStorage.getItem("username"),
          taskID: this.currentTimeSlot.task._id,
          timeSID: this.currentTimeSlot._id,
          description: this.description,
          location: this.location,
          startTime: this.startTime,
          endTime: this.endTime,
        };
        AXIOS.post("/api/student/updateTimeSlotTask", params)
          .then((response) => {
            this.errorEditTimeSlot = "";
            this.successEditTimeSlot = "Successful edit time slot";

            this.updatePage();

            this.startTime = "";
            this.endTime = "";
            this.description = "";
            this.location = "";
            this.currentTimeSlot = null;
            this.taskSelected = "";
            this.classSelected = "";
            this.togglePopupEditTimeSlot();
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            this.errorEditTimeSlot = e;
            this.successEditTimeSlot = "";
            console.log(e);
            return;
          });
      } else {
        let params = {
          username: localStorage.getItem("username"),
          classID: this.currentTimeSlot.class._id,
          timeSID: this.currentTimeSlot._id,
          description: this.description,
          location: this.location,
          startTime: this.startTime,
          endTime: this.endTime,
        };
        AXIOS.post("/api/class/updateTimeSlotClass", params)
          .then((response) => {
            this.errorEditTimeSlot = "";
            this.successEditTimeSlot = "Successful edit time slot";

            this.updatePage();

            this.startTime = "";
            this.endTime = "";
            this.description = "";
            this.location = "";
            this.currentTimeSlot = null;
            this.taskSelected = "";
            this.classSelected = "";
            this.togglePopupEditTimeSlot();
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            this.errorEditTimeSlot = e;
            this.successEditTimeSlot = "";
            console.log(e);
            return;
          });
      }
    },
    deleteTimeSlot() {
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      if (this.taskSelected) {
        let params = {
          username: localStorage.getItem("username"),
          taskID: this.currentTimeSlot.task._id,
          timeSID: this.currentTimeSlot._id,
        };
        AXIOS.post("/api/student/deleteTimeSlotTask", params)
          .then((response) => {
            this.errorDeleteTimeSlot = "";
            this.successDeleteTimeSlot = "Successful delete time slot";

            this.updatePage();

            this.startTime = "";
            this.endTime = "";
            this.description = "";
            this.location = "";
            this.currentTimeSlot = null;
            this.taskSelected = "";
            this.classSelected = "";
            this.togglePopupDeleteTimeSlot();
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            this.errorDeleteTimeSlot = e;
            this.successDeleteTimeSlot = "";
            console.log(e);
            return;
          });
      } else {
        let params = {
          username: localStorage.getItem("username"),
          classID: this.currentTimeSlot.class._id,
          timeSID: this.currentTimeSlot._id,
        };
        AXIOS.post("/api/class/deleteTimeSlotClass", params)
          .then((response) => {
            this.errorDeleteTimeSlot = "";
            this.successDeleteTimeSlot = "Successful delete time slot";

            this.updatePage();

            this.startTime = "";
            this.endTime = "";
            this.description = "";
            this.location = "";
            this.currentTimeSlot = null;
            this.taskSelected = "";
            this.classSelected = "";
            this.togglePopupDeleteTimeSlot();
          })
          .catch((e) => {
            e = e.response.data ? e.response.data : e;
            this.errorDeleteTimeSlot = e;
            this.successDeleteTimeSlot = "";
            console.log(e);
            return;
          });
      }
    },
    addNewReminder() {
      if (!this.title || !this.description || !this.deadline) {
        this.errorCreateReminder =
          "Missing fields. Please fill in all required fields";
        this.successCreateReminder = "";
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
        reminderDate: this.deadline,
      };

      AXIOS.post("/api/reminder/addReminderToStudent", params)
        .then((response) => {
          this.errorCreateReminder = "";
          this.successCreateReminder = "Successfully created reminder";

          this.updatePage();

          this.title = "";
          this.description = "";
          this.deadline = "";
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateReminder = e;
          this.successCreateReminder = "";
          console.log(e);
          return;
        });

      this.togglePopupCreateReminder();
    },
    editReminder() {
      if (!this.title || !this.description || !this.deadline) {
        this.errorCreateReminder =
          "Missing fields. Please fill in all required fields";
        this.successCreateReminder = "";
        return;
      }
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
        reminderId: this.currentReminder._id,
        title: this.title,
        description: this.description,
        reminderDate: this.deadline,
      };
      AXIOS.post("/api/reminder/updateStudentReminder", params)
        .then((response) => {
          this.errorCreateReminder = "";
          this.successCreateReminder = "Successful edit of reminder";

          this.updatePage();

          this.title = "";
          this.description = "";
          this.deadline = "";
          this.currentReminder = null;
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateReminder = e;
          this.successCreateReminder = "";
          console.log(e);
          return;
        });

      this.togglePopupEditReminder();
    },
    deleteReminder() {
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        username: localStorage.getItem("username"),
        reminderId: this.currentReminder._id,
      };

      AXIOS.post("/api/reminder/deleteStudentReminder", params)
        .then((response) => {
          this.errorCreateReminder = "";
          this.successCreateReminder = "Successful deletion of reminder";

          this.updatePage();

          this.title = "";
          this.description = "";
          this.deadline = "";
          this.currentReminder = null;
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateReminder = e;
          this.successCreateReminder = "";
          console.log(e);
          return;
        });

      this.togglePopupDeleteReminder();
    },
    addNewEvent() {
      if (
        !this.title ||
        !this.description ||
        !this.location ||
        !this.startdate ||
        !this.enddate
      ) {
        this.errorCreateEvent =
          "Missing fields. Please fill in all required fields";
        this.successCreateEvent = "";
        return;
      }
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      let params = {
        creatorID: this.studentid,
        title: this.title,
        description: this.description,
        startTime: this.startdate,
        endTime: this.enddate,
        location: this.location,
      };

      AXIOS.post("/api/event/createNewEvent", params)
        .then((response) => {
          this.errorCreateEvent = "";
          this.successCreateEvent = "Successful new class";

          this.updatePage();

          this.title = "";
          this.description = "";
          this.startTime = "";
          this.endTime = "";
          this.location = "";
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorCreateEvent = e;
          this.successCreateEvent = "";
          console.log(e);
          return;
        });

      this.togglePopupCreateEvent();
    },
    editEvent() {
      // if (
      //   !this.title ||
      //   !this.description ||
      //   !this.location ||
      //   !this.startdate ||
      //   !this.enddate
      // ) {
      //   this.errorEditEvent =
      //     "Missing fields. Please fill in all required fields";
      //   this.successEditEvent = "";
      //   return;
      // }
      // let AXIOS = axios.create({
      //   baseURL: backendUrl,
      //   headers: { "auth-token": localStorage.getItem("auth_key") },
      //   // headers: {'Access-Control-Allow-Origin': frontendUrl}
      // });
      // let params = {
      //   creatorID: this.studentid,
      //   title: this.title,
      //   description: this.description,
      //   startTime: this.startdate,
      //   endTime: this.enddate,
      //   location: this.location
      // };
      // AXIOS.post("/api/event/updateEvent", params)
      //   .then((response) => {
      //     this.errorEditEvent = "";
      //     this.successEditEvent = "Successful update event";

      //     this.updatePage();

      //     this.title = "";
      //     this.description = "";
      //     this.startTime = "";
      //     this.endTime = "";
      //     this.location = "";
      //   })
      //   .catch((e) => {
      //     e = e.response.data ? e.response.data : e;
      //     this.errorEditTask = e;
      //     this.successEditTask = "";
      //     console.log(e);
      //     return;
      //   });

      // this.togglePopupEditEvent();
      console.log("Edit event feature not yet implemented in backend");
    },
    deleteEvent() {
      // let AXIOS = axios.create({
      //   baseURL: backendUrl,
      //   headers: { "auth-token": localStorage.getItem("auth_key") },
      //   // headers: {'Access-Control-Allow-Origin': frontendUrl}
      // });
      // let params = {
      //   username: localStorage.getItem("username"),
      //   taskId: this.currentTask._id,
      // };

      // AXIOS.post("/api/student/deleteStudentTask", params)
      //   .then((response) => {
      //     this.errorCreateTask = "";
      //     this.successCreateTask = "Successful deletion of task";

      //     this.updatePage();

      //     this.title = "";
      //     this.description = "";
      //     this.currentTask = null;
      //   })
      //   .catch((e) => {
      //     e = e.response.data ? e.response.data : e;
      //     this.errorCreateTask = e;
      //     this.successCreateTask = "";
      //     console.log(e);
      //     return;
      //   });

      // this.togglePopupDeleteTask();
      console.log("Delete event feature not yet implemented in backend");
    },
    joinEvent() {
      let eventid = this.eventlist.find(
        (element) => element.title == this.eventSelected
      );
      let params = {
        eventID: eventid,
        attendeeID: this.studentid,
      };
      let AXIOS = axios.create({
        baseURL: backendUrl,
        headers: { "auth-token": localStorage.getItem("auth_key") },
        // headers: {'Access-Control-Allow-Origin': frontendUrl}
      });
      AXIOS.post("/api/event/joinEvent", params)
        .then((response) => {
          this.errorJoinEvent = "";
          this.successJoinEvent = "Successfully joined event";

          this.updatePage();

          this.eventSelected = "";
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          this.errorJoinEvent = e;
          this.successJoinEvent = "";
          console.log(e);
          return;
        });
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
    togglePopupEditTask(task) {
      this.errorCreateTask = "";
      this.successCreateTask = "";
      if (task != null) {
        this.title = task.title;
        this.currentTask = task;
        this.description = task.description;
        this.deadline = task.dueDate;
      } else {
        this.title = "";
        this.description = "";
        this.currentTask = null;
        this.deadline = "";
      }
      document.getElementById("popup-edit").classList.toggle("active");
    },
    togglePopupDeleteTask(task) {
      this.errorCreateTask = "";
      this.successCreateTask = "";

      if (task != null) {
        this.title = task.title;
        this.currentTask = task;
      }

      document.getElementById("popup-delete").classList.toggle("active");
    },
    togglePopupCreateTimeSlot() {
      this.errorCreateTimeSlot = "";
      this.successCreateTimeSlot = "";
      document
        .getElementById("popup-create-timeslot")
        .classList.toggle("active");
    },
    togglePopupEditTimeSlot(timeslot) {
      this.errorEditTimeSlot = "";
      this.successEditTimeSlot = "";
      if (timeslot != null) {
        this.startTime = timeslot.startTime;
        this.endTime = timeslot.endTime;
        this.description = timeslot.description;
        this.location = timeslot.location;
        this.currentTimeSlot = timeslot;
        if (timeslot.task) {
          this.taskSelected = timeslot.task.title;
          this.classSelected = "";
        } else {
          this.classSelected = timeslot.class.title;
          this.taskSelected = "";
        }
      }
      document.getElementById("popup-edit-timeslot").classList.toggle("active");
    },
    togglePopupDeleteTimeSlot(timeslot) {
      this.errorDeleteTimeSlot = "";
      this.successDeleteTimeSlot = "";
      if (timeslot != null) {
        this.currentTimeSlot = timeslot;
        if (timeslot.task) {
          this.taskSelected = timeslot.task.title;
          this.classSelected = "";
        } else {
          this.classSelected = timeslot.class.title;
          this.taskSelected = "";
        }
      }
      document
        .getElementById("popup-delete-timeslot")
        .classList.toggle("active");
    },
    togglePopupCreateClass() {
      this.errorCreateClass = "";
      this.successCreateClass = "";
      document.getElementById("popup-create-class").classList.toggle("active");
    },
    togglePopupEditClass(curClass) {
      this.errorEditClass = "";
      this.successEditClass = "";

      this.curClass = curClass;

      if (curClass) {
        this.classname = curClass.title;
        this.startdate = moment(curClass.startTime).format("YYYY-MM-DD");
        this.enddate = moment(curClass.endTime).format("YYYY-MM-DD");
        this.description = curClass.description;
        this.location = curClass.location;
      } else {
        this.classname = "";
        this.startdate = "";
        this.enddate = "";
        this.description = "";
        this.location = "";
      }

      document.getElementById("popup-edit-class").classList.toggle("active");
    },
    togglePopupDeleteClass(curClass) {
      this.errorDeleteClass = "";
      this.successDeleteClass = "";
      this.curClass = curClass;

      if (curClass) {
        this.classname = curClass.title;
      } else {
        this.classname = "";
      }

      document.getElementById("popup-delete-class").classList.toggle("active");
    },
    togglePopupCreateReminder() {
      this.errorCreateTimeSlot = "";
      this.successCreateTimeSlot = "";
      document
        .getElementById("popup-create-reminder")
        .classList.toggle("active");
    },
    togglePopupReminder() {
      document.getElementById("reminder").classList.toggle("active");
    },
    togglePopupEditReminder(reminder) {
      this.errorCreateReminder = "";
      this.successCreateReminder = "";
      if (reminder != null) {
        this.title = reminder.title;
        this.currentReminder = reminder;
        this.description = reminder.description;
        this.deadline = reminder.reminderDate;
      } else {
        this.title = "";
        this.description = "";
        this.deadline = "";
        this.reminderDate = "";
      }
      document.getElementById("popup-edit-reminder").classList.toggle("active");
    },
    togglePopupDeleteReminder(reminder) {
      this.errorCreateReminder = "";
      this.successCreateReminder = "";
      if (reminder != null) {
        this.title = reminder.title;
        this.currentReminder = reminder;
      }
      document
        .getElementById("popup-delete-reminder")
        .classList.toggle("active");
    },
    togglePopupCreateEvent() {
      this.errorCreateEvent = "";
      this.successCreateEvent = "";
      document.getElementById("popup-create-event").classList.toggle("active");
    },
    togglePopupEditEvent(event) {
      this.errorCreateEvent = "";
      this.successCreateEvent = "";
      if (event != null) {
        this.title = event.title;
        this.curEvent = event;
        this.description = event.description;
        this.startdate = event.startTime;
        this.enddate = event.endTime;
        this.location = event.location;
      } else {
        this.title = "";
        this.curEvent = null;
        this.description = "";
        this.startdate = "";
        this.enddate = "";
        this.location = "";
      }
      document.getElementById("popup-edit-event").classList.toggle("active");
    },
    togglePopupDeleteEvent(event) {
      this.errorDeleteEvent = "";
      this.successDeleteEvent = "";
      if (event != null) {
        this.title = event.title;
        this.curEvent = event;
      }
      document.getElementById("popup-delete-event").classList.toggle("active");
    },
    togglePopupJoinEvent() {
      document.getElementById("popup-join-event").classList.toggle("active");
    },
    updatePage() {
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
          this.classeslist = response.data.classes;
          this.reminderlist = response.data.reminders;
          for (let reminder of this.reminderlist) {
            reminder.reminderDate = moment(reminder.reminderDate).format(
              "YYYY-MM-DDTkk:mm"
            );
          }
          this.timeslotlist = [];
          for (let task of this.tasklist) {
            let params = {
              username: localStorage.getItem("username"),
              taskID: task._id,
            };
            task.dueDate = moment(task.dueDate).format("YYYY-MM-DDTkk:mm");
            AXIOS.post("/api/student/getTaskTimeslots", params)
              .then((response) => {
                var timeslots = response.data;
                for (let timeslot of timeslots) {
                  timeslot.startTime = moment(timeslot.startTime).format(
                    "YYYY-MM-DDTkk:mm"
                  );
                  timeslot.endTime = moment(timeslot.endTime).format(
                    "YYYY-MM-DDTkk:mm"
                  );
                  timeslot.task = task;
                }
                this.timeslotlist.push(...timeslots);
              })
              .catch((e) => {
                e = e.response.data ? e.response.data : e;
                console.log(e);
                return;
              });
          }
          for (let classe of this.classeslist) {
            let params = {
              username: localStorage.getItem("username"),
              classID: classe._id,
            };
            classe.startTime = moment(classe.startTime).format(
              "YYYY-MM-DDTkk:mm"
            );
            classe.endTime = moment(classe.endTime).format("YYYY-MM-DDTkk:mm");
            AXIOS.post("/api/class/getClassTimeslots", params)
              .then((response) => {
                var timeslots = response.data;
                for (let timeslot of timeslots) {
                  timeslot.startTime = moment(timeslot.startTime).format(
                    "YYYY-MM-DDTkk:mm"
                  );
                  timeslot.endTime = moment(timeslot.endTime).format(
                    "YYYY-MM-DDTkk:mm"
                  );
                  timeslot.class = classe;
                }
                this.timeslotlist.push(...timeslots);
              })
              .catch((e) => {
                e = e.response.data ? e.response.data : e;
                console.log(e);
                return;
              });
          }
          AXIOS.post("/api/event/getStudentEvents", params)
            .then((response) => {
              this.myevents = response.data;
            })
            .catch((e) => {
              e = e.response.data ? e.response.data : e;
              console.log(e);
              return;
            });
          AXIOS.post("/api/event/getAllEvents")
            .then((response) => {
              this.eventlist = response.data;
            })
            .catch((e) => {
              e = e.response.data ? e.response.data : e;
              console.log(e);
              return;
            });
        })
        .catch((e) => {
          e = e.response.data ? e.response.data : e;
          console.log(e);
          return;
        });
    },
  },
};
</script>

<style scoped>
#calendarHolder {
  position: relative;
  width: 1140px;
  margin: none;
  float: right;
}

#taskHolder,
#timeSlotHolder {
  width: 60%;
  height: 150%;
  margin-left: 30%;
  margin-top: 10%;
}
#buttonHolder {
  width: calc(100% - 1150px);
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  float: left;
}
#buttonHolder button {
  display: block;
  position: relative;
  width: 150px;
  margin: auto;
  margin-top: 20px;
}
#reminder {
  height: 300px !important;
  width: 600px !important;
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
  width: 700px;
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
</style>
