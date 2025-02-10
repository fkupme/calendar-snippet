<template>
  <div class="calendar-day">
    <!-- Заголовок -->
    <v-row class="ma-0" no-gutters>
      <v-col cols="1" class="time-header"></v-col>
      <v-col
        v-for="category in categories"
        :key="category.key"
        class="category-col"
      >
        <div class="category-title">{{ category.title }}</div>
      </v-col>
    </v-row>

    <!-- Временная сетка -->
    <div class="time-grid">
      <v-row
        v-for="hour in timeSlots"
        :key="hour"
        class="ma-0"
        no-gutters
      >
        <v-col cols="1" class="time-label">
          {{ formatHour(hour) }}
        </v-col>
        <v-col
          v-for="category in categories"
          :key="`${hour}-${category.key}`"
          class="category-col"
        >
          <div class="time-cell">
            <CalendarEvent
              v-if="hasEvent(hour, category)"
              :event="findEvent(hour, category)"
              mode="day"
              :show-category="false"
            />
          </div>
        </v-col>
      </v-row>
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

// Генерация временных интервалов (с 8:00 до 23:00)
const timeSlots = computed(() => Array.from({ length: 16 }, (_, i) => i + 8));

// Определение категорий
const categories = [
  { key: "music-loft-rehearsal", title: "Traditional" },
  { key: "new-school-studio", title: "New School" },
  { key: "bio-music-lab", title: "Bio" },
  { key: "trash-sound-space", title: "Trash" },
  { key: "oriental-melody-room", title: "Oriental" },
];

// Форматирование часа
const formatHour = (hour) => `${hour.toString().padStart(2, "0")}:00`;

// Проверка наличия события в указанное время и категорию
const hasEvent = (hour, category) => {
  const events = store.getters["calendar/getEventsByDate"](props.date, props.location);
  return events.some(
    (event) =>
      new Date(event.start).getHours() === hour &&
      event.category === category.key
  );
};

// Поиск события по времени и категории
const findEvent = (hour, category) => {
  const events = store.getters["calendar/getEventsByDate"](props.date, props.location);
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

  .time-header {
    min-width: 60px;
  }

  .category-col {
    flex: 1;
    border-left: 1px solid #e0e0e0;
  }

  .category-title {
    padding: 12px;
    text-align: center;
    background: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
  }

  .time-label {
    height: 90px;
    padding: 8px;
    text-align: right;
    color: #666;
    font-size: 12px;
    min-width: 60px;
    border-right: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .time-cell {
    height: 90px;
    border-bottom: 1px solid #e0e0e0;
    padding: 2px;
    position: relative;
  }
}
</style>