<template>
  <div id="wrapper">
    <NavBar></NavBar>
    <Calendar></Calendar>
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

    <div id="classes-test">
      <table>
        <tr
          class="classeslistitems"
          v-for="cl in classeslist"
          v-bind:id="cl._id"
          v-bind:key="cl._id"
        >
          <td>
            {{ cl.startTime }}
          </td>
          <td>
            {{ cl.endTime }}
          </td>
          <td>
            {{ cl.description }}
          </td>
          <td>
            {{ cl.location }}
          </td>
          <td>
            <button
              id="editClassButton"
              type="button"
              class="editbutton"
              @click="togglePopupEditClass(cl)"
            >
              Edit Class
            </button>
          </td>
          <td>
            <button
              id="deleteClassButton"
              type="button"
              class="btn btn-danger"
              @click="togglePopupDeleteClass(cl)"
            >
              Delete Class
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
            {{ timeslot.startTime }}
          </td>
          <td>
            {{ timeslot.endTime }}
          </td>
          <td>
            {{ timeslot.description }}
          </td>
          <td>
            {{ timeslot.location }}
          </td>
          <td v-if="timeslot.task">
            {{ timeslot.task.title }}
          </td>
          <td v-if="timeslot.class">
            {{ timeslot.class.title }}
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
      <button id="createClassButton" v-on:click="togglePopupCreateClass()">
        Create Class
      </button>
      <button id="createReminderButton" v-on:click="togglePopupCreateReminder()">
        Create Reminder
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
            type="datetime-local"
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
            maxlength="10"
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
            maxlength="10"
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
            type="datetime-local"
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
        <div class="close-btn" @click="togglePopupCreateReminder()">&times;</div>
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
            id="title"
            placeholder="Reminder Title"
            v-model="title"
          />
          <div v-if="errorCreateReminder && !description" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="description"
            placeholder="Description"
            v-model="description"
          />
          <div v-if="errorCreateReminder && !deadline" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="datetime-local"
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

      <div id="Reminders" style="height: 250px; width: 650px; overflow-y:auto">
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
            id="titleEdit"
            :placeholder="[[title]]"
            v-model="title"
          />
          <div v-if="errorCreateReminder && !description" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="text"
            id="descriptionEdit"
            :placeholder="[[description]]"
            v-model="description"
          />
          <div v-if="errorCreateReminder && !reminderDate" style="color: red">
            * Required
          </div>
          <input
            class="inpbox"
            type="datetime-local"
            id="deadlineEdit"
            :placeHolder="[[reminderDate]]"
            maxlength="10"
            min="2021-01-01"
            max="3000-12-31"
            v-model="deadline"
          />
          <button
            id="updateChanges"
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
        <div class="close-btn" @click="togglePopupDeleteReminder()">&times;</div>
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
            id="btndelete"
            @click="deleteReminder()"
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
import moment from "moment";
import Calendar from '@/components/Calendar.vue';

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
      title: "",
      tasklist: [],
      timeslotlist: [],
      classeslist: [],
      reminderlist: [],
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
      taskOrClass: "",
      index: -1,
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
      currenttask: null,
      curClass: null,
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
        this.classeslist = response.data.classes;
        this.reminderlist = response.data.reminders;
        this.timeslotlist = [];
        for (let task of this.tasklist) {
          let params = {
            username: localStorage.getItem("username"),
            taskID: task._id,
          };
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
          console.log("Worked");

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
        taskId: this.currenttask._id,
        title: this.title,
        description: this.description,
        dueDate: this.deadline,
      };
      //console.log(this.currenttask);
      console.log(this.currenttask._id);
      AXIOS.post("/api/student/updateStudentTask", params)
        .then((response) => {
          this.errorCreateTask = "";
          this.successCreateTask = "Successful edit of task";
          console.log("Edit successful");

          this.updatePage();

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

          this.updatePage();

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
    addNewClass() {
      if (
        !this.classname ||
        !this.description ||
        !this.location ||
        !this.startdate ||
        !this.enddate /*|| !this.timeslot*/
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
          console.log("class created");

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
        !this.enddate /*|| !this.timeslot*/
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
          console.log("class updated");

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
          console.log("Delete successful");

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
          taskID: this.timeslotlist[this.index].task._id,
          timeSID: this.timeslotlist[this.index]._id,
          description: this.description,
          location: this.location,
          startTime: this.startTime,
          endTime: this.endTime,
        };
        console.log(params);
        AXIOS.post("/api/student/updateTimeSlotTask", params)
          .then((response) => {
            this.errorEditTimeSlot = "";
            this.successEditTimeSlot = "Successful edit time slot";

            this.updatePage();

            this.startTime = "";
            this.endTime = "";
            this.description = "";
            this.location = "";
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
          classID: this.timeslotlist[this.index].class._id,
          timeSID: this.timeslotlist[this.index]._id,
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
          taskID: this.timeslotlist[this.index].task._id,
          timeSID: this.timeslotlist[this.index]._id,
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
          classID: this.timeslotlist[this.index].class._id,
          timeSID: this.timeslotlist[this.index]._id,
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
          console.log("Worked");

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
      //console.log(this.currenttask);
      console.log(this.currentReminder._id);
      AXIOS.post("/api/reminder/updateStudentReminder", params)
        .then((response) => {
          this.errorCreateReminder = "";
          this.successCreateReminder = "Successful edit of reminder";
          console.log("Edit successful");

          this.updatePage();

          this.title = "";
          // this.tasktype = "";
          this.description = "";
          //this.location = "";
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
          console.log("Delete successful");

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
      } else {
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
        this.startTime = timeslot.startTime;
        this.endTime = timeslot.endTime;
        this.description = timeslot.description;
        this.location = timeslot.location;
        if (timeslot.task) {
          this.taskSelected = timeslot.task.title;
          this.classSelected = "";
        } else {
          this.classSelected = timeslot.class.title;
          this.taskSelected = "";
        }
        this.index = index;
      }
      document.getElementById("popup-edit-timeslot").classList.toggle("active");
    },
    togglePopupDeleteTimeSlot(timeslot, index) {
      this.errorDeleteTimeSlot = "";
      this.successDeleteTimeSlot = "";
      if (timeslot != null) {
        this.index = index;
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

      if(curClass) {
        this.classname = curClass.title;
        this.startdate = moment(curClass.startTime).format("YYYY-MM-DD");
        this.enddate = moment(curClass.endTime).format("YYYY-MM-DD");
        this.description = curClass.description;
        this.location = curClass.location;
      }
      else {
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

      if(curClass) {
        this.classname = curClass.title;
      }
      else {
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
      //console.log(task);
      //console.log(this.title);
      if (reminder != null) {
        this.title = reminder.title;
        this.currentReminder = reminder;
        this.description = reminder.description;
        this.reminderDate = reminder.reminderDate;
      } else {
        this.title = "";
        this.description = "";
        //       this.index = -1;
        // this.currenttask = null;
        this.deadline = "";
        this.reminderDate = "";
      }
      //console.log(this.title);
      document.getElementById("popup-edit-reminder").classList.toggle("active");
    },
    togglePopupDeleteReminder(reminder) {
      this.errorCreateReminder = "";
      this.successCreateReminder = "";
      //console.log(task);
      //console.log(this.title);
      if (reminder != null) {
        this.title = reminder.title;
        this.currentReminder = reminder;
      }
      // else {
      //   this.title = "";
      //   this.description = "";
      //   this.index = -1;
      //   this.currenttask = null;
      // }
      //console.log(this.title);
      document.getElementById("popup-delete-reminder").classList.toggle("active");
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
          this.timeslotlist = [];
          for (let task of this.tasklist) {
            let params = {
              username: localStorage.getItem("username"),
              taskID: task._id,
            };
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
  /* height: 300px; */
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
