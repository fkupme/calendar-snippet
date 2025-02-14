<template>
  <v-card :style="cardStyles" elevation="0" >
    <v-card-text class="calendar__content pa-0">
      <component
        :is="currentView"
        :date="settings.date"
        :location="settings.location"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import CalendarDay from "@/components/calendar/CalendarDay";
import CalendarWeek from "@/components/calendar/CalendarWeek";
import CalendarMonth from "@/components/calendar/CalendarMonth";
import { computed } from "vue";

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const cardStyles = computed(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const currentView = computed(() => {
  switch (props.settings.view) {
    case "day":
      return CalendarDay;
    case "week":
      return CalendarWeek;
    case "month":
      return CalendarMonth;
    default:
      return CalendarDay;
  }
});
</script>
<style lang="scss" scoped>
.calendar__content {
  overflow-y: auto;
}
</style>