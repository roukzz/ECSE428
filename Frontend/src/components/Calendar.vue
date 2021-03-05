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

        <!-- TODO: Display timeslots for that day (chronological order) -->
        <!-- <div class="day-content" v-for="timeslot in day" v-bind:key="timeslot.id"></div>  -->
      </div>
    </div>
    
  </div> 
</template>

<script>

const monthNames_short = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
const weekdayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default {
  name: "Calendar",
  data() {
    return {
      month_input: null,
      full_date: null,
      days: [],
    };
  },
  props: {
    tasks: {
      type: Object,
      default: null
    },
    timeslots: {
      type: Object,
      default: null
    }
  },
  methods: {
    countDays () {
      var n = this.daysInMonth(this.full_date.getMonth(), this.full_date.getFullYear());
      var month_short = monthNames_short[this.full_date.getMonth()];

      var tmp_arr = [];
      var tmp_date = new Date();
      for (var i = 1; i <= n; i++) {
        tmp_date.setDate(i);
        tmp_arr.push(
          {
            "num": this.ordinal_suffix_of(i),
            "weekday": weekdayNames[tmp_date.getDay()],
            "month_short": month_short,
            "timeslots": this.getDailyTimeslots(tmp_date)
          }
        );
      }
      this.days = tmp_arr;
    },
    getDailyTimeslots (date) {

      /* 
       * TODO:
       * Get tasks/timesolts corresponding to that date and return them as a list 
       */

      return null;
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
      this.countDays();
    },
    tasks () {
      // do what I want when task is updated
      // call update UI method
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
}

.day-header {
  text-align: center;
  font-weight: bold;
  padding: 10px;
}

</style>