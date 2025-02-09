<template>
  <CalendarPanel
    :selectedView="selectedView"
    v-model:selectedView="selectedView"
  />
  <v-calendar
    ref="calendar"
    v-model="selectedDate"
    :events="events"
    color="primary"
    type="today"
  ></v-calendar>
</template>

<script setup>
import { ref, shallowRef } from "vue";
// import { VCalendar, VCalendarInterval } from 'vuetify/labs/VCalendar';
import CalendarPanel from "@/components/CalendarPanel.vue";


const today = new Date(). toISOString().substr(0, 10);
const selectedView = shallowRef("today");
const selectedDate = ref();



</script>
