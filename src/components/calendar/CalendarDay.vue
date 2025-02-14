<template>
  <div class="calendar-day">
    <div class="calendar-day__header">
      <div class="calendar-day__time-header"></div>
      <div
        v-for="category in categories"
        :key="category.key"
        class="calendar-day__category"
      >
        <div class="calendar-day__category-title fs-15">
          {{ category.title }}
        </div>
      </div>
    </div>
    <div class="calendar-day__grid">
      <div v-for="hour in timeSlots" :key="hour" class="calendar-day__row">
        <div class="calendar-day__time-label bgc-primary fs-8">
          {{ formatHour(hour) }}
        </div>
        <div
          v-for="category in categories"
          :key="`${hour}-${category.key}`"
          class="calendar-day__cell bgc-primary"
        >
          <div class="calendar-day__event">
            <CalendarEvent
              v-if="hasEvent(hour, category)"
              :event="findEvent(hour, category)"
              mode="day"
              :show-category="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import CalendarEvent from "./CalendarEvent.vue";

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const store = useStore();

const timeSlots = computed(() => Array.from({ length: 16 }, (_, i) => i + 8));

const categories = [
  { key: "music-loft-rehearsal", title: "Traditional" },
  { key: "new-school-studio", title: "New School" },
  { key: "bio-music-lab", title: "Bio" },
  { key: "trash-sound-space", title: "Trash" },
  { key: "oriental-melody-room", title: "Oriental" },
];

const formatHour = (hour) => `${hour.toString().padStart(2, "0")}:00`;

const hasEvent = (hour, category) => {
  const events = store.getters["calendar/getEventsByDate"](
    props.date,
    props.location
  );
  return events.some(
    (event) =>
      new Date(event.start).getHours() === hour &&
      event.category === category.key
  );
};

const findEvent = (hour, category) => {
  const events = store.getters["calendar/getEventsByDate"](
    props.date,
    props.location
  );
  return events.find(
    (event) =>
      new Date(event.start).getHours() === hour &&
      event.category === category.key
  );
};
</script>

<style lang="scss" scoped>
.calendar-day {
  height: 100%;
  background: white;

  &__header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebeced;
  }

  &__time-header {
    width: 60px;
  }

  &__category {
    flex: 1;
  }

  &__category-title {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ebeced;
  }

  &__grid {
    display: flex;
    flex-direction: column;
  }

  &__row {
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid #ebeced;
  }

  &__time-label {
    width: 60px;
    text-align: center;
    padding: 8px;
    border-right: 3px solid #ccc;
  }

  &__cell {
    flex: 1;
    height: 70px;
    padding: 2px;
    position: relative;
    border-left: 1px solid #ebeced;
  }

  &__event {
    border-radius: 10px;
    box-shadow: 2px 4px 50px 0px rgba(0, 0, 0, 0.1);
    background: rgb(255, 255, 255);
    &_not-empty {
      height: 64px;
    }
  }
}
</style>
