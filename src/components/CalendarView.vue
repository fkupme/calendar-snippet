<template>
  <CalendarPanel
    :selectedView="selectedView"
    :options="cardOptions"
    v-model:selectedView="selectedView"
  />
  <v-calendar
    ref="calendar"
    v-model="focus"
    :events="events"
    :event-color="getEventColor"
    @click:event="showEvent"
  ></v-calendar>
</template>

<script setup>
import { ref } from "vue";
import CalendarPanel from "@/components/CalendarPanel.vue";



const selectedView = ref("today");

const cardOptions = ref([
  {
    id: 1,
    title: "Traditional Rehearsal Hall",
    subtitle: "Traditional",
    value: "traditional-rehearsal-hall",
    avatar: "@/assets/images/calendar-panel-dropdown-avatar.png",
  },
  {
    id: 2,
    title: "New School Studio",
    subtitle: "New School",
    value: "new-school-studio",
    avatar: "@/assets/images/calendar-panel-dropdown-avatar.png",
  },
  {
    id: 3,
    title: "Bio Music Lab",
    subtitle: "Bio",
    value: "bio-music-lab",
    avatar: "@/assets/images/calendar-panel-dropdown-avatar.png",
  },
  {
    id: 4,
    title: "Trash Sound Space",
    subtitle: "Trash",
    value: "trash-sound-space",
    avatar: "@/assets/images/calendar-panel-dropdown-avatar.png",
  },
  {
    id: 5,
    title: "Oriental Melody Room",
    subtitle: "Oriental",
    value: "oriental-melody-room",
    avatar: "@/assets/images/calendar-panel-dropdown-avatar.png",
  },
]);
</script>
