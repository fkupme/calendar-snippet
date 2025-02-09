<template>
  <CalendarPanel />
  <v-calendar
    hideHeader="true"
    :viewMode="settings.view || 'month'"
    :hideDayHeader="false"
    ref="calendar"
    :model-value="settings.date"
    color="primary"
  >
    <template v-slot:day-header="{ categries }">{{ categries }}</template>
    <template v-slot:day="{ categries }"> categries </template>
    
  </v-calendar>
</template>

<script setup>
import { VCalendar } from "vuetify/labs/VCalendar";
import CalendarPanel from "@/components/CalendarPanel.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
const categries = ref([
  { key: "music-loft-rehearsal", title: "Music Loft Rehearsal" },
  { key:"new-school-studio", title:"New School Studio" },
  { key:"bio-music-lab", title:"Bio Music Lab" },
  { key:"trash-sound-space", title:"Trash Sound Space" },
  { key:"oriental-melody-room", title:"Oriental Melody Room" },
]);

const store = useStore();
const settings = computed(() => store.state.calendar.calendarState);
</script>
