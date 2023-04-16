<template>
  <div class="room-reservation">
    <div class="room-header">
      <div class="room-time-slot"></div>
      <div class="room-day" v-for="day in days" :key="day">{{ day }}</div>
    </div>
    <div class="room-body" v-for="time in timeSlots" :key="time">
      <div class="room-time-slot">{{ time }}</div>
      <div class="room-cell" v-for="day in days" :key="day" @click="reserve(day, time, getTimeSlotEnd(time))"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    };
  },
  computed: {
    timeSlots() {
      const timeSlots = [];
      let time = this.room.openingTime;
      while (time < this.room.closingTime) {
        timeSlots.push(time);
        time = this.getTimeSlotEnd(time);
      }
      return timeSlots;
    },
  },
  methods: {
    getTimeSlotEnd(time) {
      let [hours, minutes, meridiem] = time.split(" ");
      if (meridiem === "AM" && hours === "12") {
        hours = "0";
      } else if (meridiem === "PM" && hours !== "12") {
        hours = String(parseInt(hours) + 12);
      }
      const nextHour = parseInt(hours) + 1;
      return `${nextHour.toString().padStart(2, "0")}:${minutes} ${meridiem}`;
    },
    reserve(day, start, end) {
      alert(`You reserved the room on ${day} from ${start} to ${end}`);
    },
  },
};
</script>

<style>
  .room-reservation {
    display: flex;
    flex-direction: column;
  }

  .room-header {
    display: flex;
  }

  .room-day {
    width: calc((100% - 100px) / 5);
    text-align: center;
    font-weight: bold;
  }

  .room-time-slot {
    width: 100px;
    text-align: center;
  }

  .room-body {
    display: flex;
  }

  .room-cell {
    width: calc((100% - 100px) / 5);
    height: 50px;
    border: 1px solid #ccc;
  }
</style>