<template>
  <div class="calendar-month">
    <!-- Заголовок с днями недели -->
    <v-row class="ma-0" no-gutters>
      <v-col 
        v-for="day in weekDays" 
        :key="day"
        class="calendar-month__weekday fs-15"
      >
        {{ day }}
      </v-col>
    </v-row>

    <!-- Сетка дней -->
    <div class="calendar-month__grid">
      <v-row 
        v-for="week in monthGrid" 
        :key="week[0].date"
        class="ma-0"
        no-gutters
      >
        <v-col 
          v-for="day in week" 
          :key="day.date"
          class="calendar-month__day bgc-primary pa-1"
          :class="{ 'calendar-month__day_other-month': !day.isCurrentMonth }"
        >
          <div class="calendar-month__day-header">
            <span class="calendar-month__day-number fs-14 font-weight-medium" >{{ day.dayNumber }}</span>
            <span v-if="getEventsCount(day.date)" class="calendar-month__events-count fs-12">
              {{ getEventsCount(day.date) }} событий
            </span>
          </div>
          
          <div class="calendar-month__events fs-12">
            <div 
              v-for="event in getDayEvents(day.date).slice(0, 3)" 
              :key="event.id"
              class="calendar-month__event fs-12"
              :class="`calendar-month__event_status-${event.status}`"
            >
              <span class="calendar-month__event-time">
                {{ formatEventTime(event) }}
              </span>
              <span class="calendar-month__event-title">
                {{ event.title }}
              </span>
            </div>
            <div 
              v-if="getDayEvents(day.date).length > 3" 
              class="calendar-month__more-events fs-11"
            >
              +{{ getDayEvents(day.date).length - 3 }} ещё
            </div>
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

const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const monthGrid = computed(() => {
  const grid = [];
  const date = new Date(props.date.getFullYear(), props.date.getMonth(), 1);
  const lastDay = new Date(props.date.getFullYear(), props.date.getMonth() + 1, 0);
  
  // Получаем первый день недели (понедельник)
  const firstDayOfGrid = new Date(date);
  firstDayOfGrid.setDate(firstDayOfGrid.getDate() - (firstDayOfGrid.getDay() || 7) + 1);
  
  // Заполняем сетку
  const currentDate = new Date(firstDayOfGrid);
  while (currentDate <= lastDay || grid.length < 6) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push({
        date: currentDate.toISOString().split('T')[0],
        dayNumber: currentDate.getDate(),
        isCurrentMonth: currentDate.getMonth() === props.date.getMonth()
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    grid.push(week);
  }
  
  return grid;
});

const getDayEvents = (date) => {
  return store.getters['calendar/getEventsByDate'](new Date(date), props.location)
    .sort((a, b) => new Date(a.start) - new Date(b.start));
};

const getEventsCount = (date) => {
  return getDayEvents(date).length;
};

const formatEventTime = (event) => {
  const startTime = useDateFormat(new Date(event.start), 'HH:mm');
  return startTime.value;
};

</script>

<style lang="scss" scoped>
.calendar-month {
  height: 100%;
  background: white;

  &__weekday {
    padding: 8px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
  }

  &__day {
    border: 1px solid #EBECED;
    min-height: 120px;
		overflow: hidden;

    &_other-month {
      background: #cccccc30;
      color: #999;
    }
  }

  &__day-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }


  &__events-count {
    background: #e0e0e0;
    border-radius: 10px;
    padding: 2px 6px;
  }

  &__event {
    margin-bottom: 2px;
    padding: 2px 4px;
    border-radius: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &_status {
      &-reserved {
        background-color: #f5882861;
        border-left: 2px solid #F58628;
      }

      &-paid {
        background-color: #88ca4752;
        border-left: 2px solid #88CA47;
      }

      &-paid_partially {
        background: linear-gradient(to right, #88CA47, #F58628) 1;
        border-image:  linear-gradient(to right, #88CA47, #F58628) 1;
        border-left: 2px solid;
      }

      &-closed {
        background-color: #00000060;
        border-left: 2px solid #000;
      }

      &-without {
        background-color: #939292;
        border-left: 2px solid #939292;
      }
    }
  }

  &__event-time {
    margin-right: 4px;
    font-weight: 500;
  }

  &__more-events {
    color: #666;
    padding: 2px 4px;
  }
}
</style>