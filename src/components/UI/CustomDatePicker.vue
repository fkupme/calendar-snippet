<template>
  <div class="custom-date-picker">
    <div class="date-header d-flex justify-space-between align-center">
      <span class="month-title fs-16 font-weight-medium">{{ formattedMonth }}</span>
      <v-btn variant="text" icon @click="previousMonth">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn variant="text" icon @click="nextMonth">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <transition name="fade" mode="out-in">
      <div class="calendar-grid" :key="currentDate.getMonth()">
        <div v-for="(day, index) in daysInMonth" :key="index" class="day-cell">
          <button
            :class="['day-button', { selected: isSelected(day) }]"
            @click="selectDate(day)"
          >
            {{ day.day }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";


const props = defineProps({
  modelValue: {
    type: [Date, String],
    default: null,
  },
});


const emit = defineEmits(["update:modelValue"]);


const currentDate = ref(new Date());
const selectedDate = ref(null);


const formattedMonth = computed(() => {
  return currentDate.value.toLocaleString("ru-RU", {
    month: "long",
    year: "numeric",
  });
});

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push({ day: i, date: new Date(year, month, i) });
  }

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.unshift({ day: "", date: null });
  }

  return days;
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      selectedDate.value = null;
      return;
    }
    selectedDate.value = new Date(newVal);
    currentDate.value = new Date(newVal);
  },
  { immediate: true }
);


function selectDate(day) {
  if (!day.date) return;
  selectedDate.value = day.date;
  emit("update:modelValue", day.date);
}

function isSelected(day) {
  return (
    selectedDate.value &&
    day.date &&
    selectedDate.value.toISOString().split("T")[0] ===
      day.date.toISOString().split("T")[0]
  );
}

function previousMonth() {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() - 1, 1);
  currentDate.value = newDate;
}

function nextMonth() {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + 1, 1); 
  currentDate.value = newDate;
}
</script>

<style lang="scss" scoped>
.custom-date-picker {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;

  .date-header {
    margin-bottom: 16px;
    text-transform: capitalize;
    border-bottom: 1px solid black;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .day-cell {
    text-align: center;
  }

  .day-button {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;

    &.selected {
      background: black;
      color: white;
    }

    &:hover:not(.selected) {
      background: #f5f5f5;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from{
	opacity: 0;
	transform: translateY(20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>