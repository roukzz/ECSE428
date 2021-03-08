<template>
  <div id="calendar_container">

    <div id="month_container">
      <input type="month" id="month_input" name="month_input" min="2018-03" v-model="month_input">
    </div>

    <div class="week-container">
      <div class="day-container" v-for="day in this.days" v-bind:key="day.num">
        <div class="day-header">
          {{ day.weekday }}, <br/> {{ day.month_short }} {{ day.num }} <hr>
        </div>

        <div class="day-content" v-for="item in day.items" v-bind:key="item._id" v-bind:id="item._id">
          <table v-if="item.type == 'timeslot'" style="background-color: #99ccff" v-bind:id="`timeslot-created`" v-on:click="controls_panels_on(item, $event)">
            <tr>
              <th>{{ item.startTime.split("T")[1] }} <br/> | <br/>  {{ item.endTime.split("T")[1] }}</th>
              <td>{{ item.description }} <br/> {{ item.location }}</td>
            </tr>
          </table>

          <table v-if="item.type == 'task'" style="background-color: #ff9999" v-bind:id="`task-created`" v-on:click="controls_panels_on(item, $event)">
            <tr>
              <th>{{ item.dueDate.split("T")[1] }}</th>
              <td>{{ item.title }} <br/> {{ item.description }}</td>
            </tr>
          </table>

          <table v-if="item.type == 'class'" style="background-color: #99ff99" v-on:click="controls_panels_on(item, $event)">
            <tr v-if="item.spec == 'start'">
              <th rowspan="2">Start</th>
              <td>{{ item.title }}</td>
            </tr>
            <tr v-if="item.spec == 'end'">
              <th rowspan="2">End</th>
              <td>{{ item.title }}</td>
            </tr>
            <tr>
              <td>{{ item.description }} <br/> {{ item.location }} </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div id="controls_panel" style="display: none;">
      <div class="close-btn" v-on:click="controls_panels_off()">
        &times;
      </div>
      <button v-on:click="trigger_edit()" id="editButton">Edit</button>
      <button v-on:click="trigger_delete()" id="deleteButton">Delete</button>
    </div>
    
  </div> 
</template>

<script>

const monthNames_short = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default {
  name: "Calendar",
  data() {
    return {
      month_input: null,
      full_date: null,
      task_selection: null,
      timeslot_selection: null,
      class_selection: null,
      controls_on: false,
    };
  },
  props: {
    tasks: {
      type: Array,
      default: null
    },
    timeslots: {
      type: Array,
      default: null
    },
    classes: {
      type: Array,
      default: null
    }
  },
  computed: {
    days() {
      return this.countDays();
    }
  },
  methods: {
    countDays () {
      var tmp_arr = [];

      if (this.full_date != null) {

        var n = this.daysInMonth(this.full_date.getMonth() + 1, this.full_date.getFullYear());
        var month_short = monthNames_short[this.full_date.getMonth()];
        var tmp_date = new Date();
        tmp_date.setMonth(this.full_date.getMonth());
        var tmp_items;

        for (var i = 1; i <= n; i++) {
          tmp_date.setDate(i);
          tmp_items = this.getDailyTimeslots(tmp_date).concat(this.getDailyTasks(tmp_date), this.getDailyClasses(tmp_date));
          tmp_arr.push(
            {
              "num": this.ordinal_suffix_of(i),
              "weekday": weekdayNames[tmp_date.getDay()],
              "month_short": month_short,
              "items": tmp_items.sort((a, b) => this.isBefore(a, b) ? 1 : -1)
            }
          );
        }
      }
      return tmp_arr
    },
    getDailyTimeslots (date) {
    
      var daily_timeslots = [];
      var timeslot_start_date;
      var date_str = date.getFullYear() + "-" + this.padMonth(date.getMonth() + 1) + "-" + this.padMonth(date.getDate());
      var mod_timeslot;

      for (var i = 0; i < this.timeslots.length; i++) {
        
        timeslot_start_date = this.timeslots[i].startTime.split("T");
        
        if (timeslot_start_date[0] == date_str) {
          
          mod_timeslot = this.timeslots[i];
          mod_timeslot["type"] = "timeslot";

          daily_timeslots.push(mod_timeslot);
        }
      }

      return daily_timeslots;
    },
    getDailyTasks (date) {
      var daily_tasks = [];
      var task_start_date;
      var date_str = date.getFullYear() + "-" + this.padMonth(date.getMonth() + 1) + "-" + this.padMonth(date.getDate());
      var mod_task;

      for (var i = 0; i < this.tasks.length; i++) {
        
        task_start_date = this.tasks[i].dueDate.split("T");

        if (task_start_date[0] == date_str) {
          
          mod_task = this.tasks[i];
          mod_task["type"] = "task";

          daily_tasks.push(mod_task);
        }
      }

      return daily_tasks;
    },
    getDailyClasses (date) {
      var daily_classes = [];
      var class_start_date;
      var class_end_date;
      var date_str = date.getFullYear() + "-" + this.padMonth(date.getMonth() + 1) + "-" + this.padMonth(date.getDate());
      var mod_class_start;
      var mod_class_end;

      for (var i = 0; i < this.classes.length; i++) {
        
        class_start_date = this.classes[i].startTime.split("T");
        class_end_date = this.classes[i].endTime.split("T");

        if (class_start_date[0] == date_str) {
          mod_class_start = this.classes[i];
          mod_class_start["type"] = "class";
          mod_class_start["spec"] ="start";

          daily_classes.push({...mod_class_start});
        }
        else if (class_end_date[0] == date_str) {
          mod_class_end = this.classes[i];
          mod_class_end["type"] = "class";
          mod_class_end["spec"] = "end";

          daily_classes.push(mod_class_end);
        }
      }

      return daily_classes;
    },
    daysInMonth (month, year) {
      return new Date(year, month, 0).getDate();
    },
    padMonth (num) {
      num = num.toString();
      if (num.length < 2) {
        num = "0" + num;
      }
      return num;
    },
    ordinal_suffix_of(i) {
      var j = i % 10,
          k = i % 100;
      if (j == 1 && k != 11) {
          return i + "st";
      }
      if (j == 2 && k != 12) {
          return i + "nd";
      }
      if (j == 3 && k != 13) {
          return i + "rd";
      }
      return i + "th";
    },
    isBefore(a, b) {
      if (a.type == "task" && b.type == "task") {
        return (a.dueDate.split("T")[1] > b.dueDate.split("T")[1])
      }
      else if (a.type == "task" && b.type == "timeslot") {
        return (a.dueDate.split("T")[1] > b.startTime.split("T")[1]);
      }
      else if (a.type == "timeslot" && b.type == "timeslot") {
        return (a.startTime.split("T")[1] > b.startTime.split("T")[1]);
      }
      else if (a.type == "timeslot" && b.type == "task") {
        return (a.startTime.split("T")[1] > b.dueDate.split("T")[1]);
      }
      else if (a.type == "class") {
        return (1 > 0)
      }
      else if (b.type == "class") {
        return (0 > 1)
      }
      return true;
    },
    controls_panels_on (item, event) {

      var xpos = event.clientX - Math.floor(380 * window.innerWidth/1536);
      var ypos = event.clientY - Math.floor(60 * window.innerWidth/1536);

      document.getElementById("controls_panel").style = "display: block; left:" + xpos + "px; top:" + ypos + "px;";

      if (item.type == "task") {
        this.task_selection= item;
      }
      else if (item.type == "timeslot") {
        this.timeslot_selection = item;
      }
      else if (item.type == "class") {
        this.class_selection = item;
      }
    },
    controls_panels_off() {
      document.getElementById("controls_panel").style = "display: none;";
      this.task_selection = null;
      this.timeslot_selection = null;
      this.class_selection = null;
    },
    trigger_edit() {
      if (this.task_selection != null) {
        // update task
        this.$parent.togglePopupEditTask(this.task_selection);
      }
      else if (this.timeslot_selection != null) {
        // update timeslot
        this.$parent.togglePopupEditTimeSlot(this.timeslot_selection);
      }
      else if (this.class_selection != null) {
        // update class
        this.$parent.togglePopupEditClass(this.class_selection);
      }
      this.controls_panels_off();
    },
    trigger_delete() {
      if (this.task_selection != null) {
        // delete task
        this.$parent.togglePopupDeleteTask(this.task_selection);
      }
      else if (this.timeslot_selection != null) {
        // delete timeslot
        this.$parent.togglePopupDeleteTimeSlot(this.timeslot_selection);
      }
      else if (this.class_selection != null) {
        // delete class
        this.$parent.togglePopupDeleteClass(this.class_selection);
      }
      this.controls_panels_off();
    }
  },
  mounted () {
    this.full_date = new Date();
    this.month_input = this.full_date.getFullYear() + "-" + this.padMonth(this.full_date.getMonth() + 1);
  },
  watch : {
    month_input: function () {
      
      var split = this.month_input.split("-");
      var tmp_date = new Date();
      tmp_date.setFullYear(parseInt(split[0]), parseInt(split[1]) - 1, 1);

      this.full_date = tmp_date;
    }
  }
};
</script>

<style scoped>

#calendar_container {
  width: 1140px;
  height: 600px;
  padding: 10px;
  background-color: grey;
}

#controls_panel {
  position: absolute;
  width: 250px;
  height: 100px;
  border-radius: 5px;
  background-color: #efeff5;
  border: solid 1px black;
  padding-top: 10px;
}

#controls_panel button {
  position: relative;
  display: block;
  width: 100px;
  left: calc(50% - 50px);
  margin-top: 10px;
}

#month_container {
  text-align: right;
  font-size: 28px;
  height: fit-content;
  width: 100%;
  background-color: white;
  border-radius: 5px;
}

#month_input {
  border: none;
  border-radius: 5px;
}

.week-container {
  display: flex;
  overflow-x: scroll;
}

.day-container {
  min-width: 150px;
  height: 500px;
  margin: 10px 5px;
  background-color: white;
  border-radius: 5px;
  overflow-y: auto;
}

.day-header {
  text-align: center;
  font-weight: bold;
  padding: 10px 10px 0px 10px;
}

.day-content table {
  font-size: 12px;
  margin: 0px 5px 20px 5px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}

.day-content table th {
  border-right: solid black 1px;
  padding-right: 5px;
}

.day-content table td {
  width: 100%;
}

.close-btn {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
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

</style>