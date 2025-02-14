<template>
  <div class="calendar-week">
    <v-row class="ma-0" no-gutters>
      <v-col cols="1" class="time-header"></v-col>
      <v-col 
        v-for="day in weekDays" 
        :key="day.date"
        class="day-col"
      >
        <div class="day-title ">
          <div class="fs-15">{{ day.dayName }}</div>
          <div class="fs-12 text-secondary">{{ day.dayNumber }}</div>
        </div>
      </v-col>
    </v-row>

    <div class="time-grid">
      <v-row 
        v-for="hour in timeSlots" 
        :key="hour"
        class="ma-0"
        no-gutters
      >
        <v-col cols="1" class="time-label fs-8 text-secondary bgc-primary">
          {{ formatHour(hour) }}
        </v-col>

        <v-col 
          v-for="day in weekDays" 
          :key="`${hour}-${day.date}`"
          class="day-col"
        >
          <div class="time-cell bgc-primary">
            <CalendarEvent
              v-if="hasEvent(hour, day.date)"
              :event="findEvent(hour, day.date)"
              mode="week"
              :show-category="location === 'all-studios'"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useDateFormat } from '@vueuse/core';
import { useStore } from 'vuex';
import CalendarEvent from './CalendarEvent.vue';

const props = defineProps({
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const store = useStore();
const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8);

const weekDays = computed(() => {
  const days = [];
  const currentDate = new Date(props.date);
  const firstDay = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));

  for (let i = 1; i < 8; i++) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      dayName: useDateFormat(date, 'dddd').value,
      dayNumber: useDateFormat(date, 'DD.MM').value
    });
  }
  return days;
});


const formatHour = (hour) => `${hour.toString().padStart(2, '0')}:00`;

const findEvent = (hour, date) => {
  const events = store.getters['calendar/getEventsByDate'](new Date(date), props.location);
  return events.find(event => {
    const eventHour = new Date(event.start).getHours();
    return eventHour === hour;
  });
};

const hasEvent = (hour, date) => !!findEvent(hour, date);
</script>

<style lang="scss" scoped>
.calendar-week {
  height: 100%;
  background: white;

  .time-header {
    min-width: 60px;
  }

  .day-col {
    flex: 1;
  }

  .day-title {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ebeced;
    div{
      text-transform: capitalize !important;
    }
  }

  .time-label {
    height: 90px;
    padding: 8px;
    text-align: center;
    min-width: 60px;
    border-right: 1px solid #ebeced;
  }

  .time-cell {
    height: 90px;
    border-bottom: 1px solid #ebeced;
    padding: 2px;
  }
}
</style>