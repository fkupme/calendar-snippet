<template>
  <v-card 
    :style="cardStyles"
    class="calendar"
    elevation="3"
    :min-width="600"
  >
    <v-card-text 
      :style="contentStyles"
      class="calendar__content pa-0"
    >
      <component
        :is="currentView"
        :date="settings.date"
        :location="settings.location"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import CalendarDay from "@/components/calendar/CalendarDay.vue";
import CalendarWeek from "@/components/calendar/CalendarWeek.vue";
import CalendarMonth from "@/components/calendar/CalendarMonth.vue";
import { computed } from "vue";

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const cardStyles = computed(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const contentStyles = computed(() => ({
  height: 'calc(100vh - 200px)',
  overflowY: 'auto',
}));

const currentView = computed(() => {
  switch(props.settings.view) {
    case 'day':
      return CalendarDay;
    case 'week':
      return CalendarWeek;
    case 'month':
      return CalendarMonth;
    default:
      return CalendarDay;
  }
});
</script>

<style lang="scss" scoped>
.calendar {
  &__content {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
      
      &:hover {
        background: #555;
      }
    }
  }
}
</style>