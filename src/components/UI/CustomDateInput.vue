<template>
  <v-menu v-model="showDatePicker" :close-on-content-click="false">
    <!-- Активатор -->
    <template v-slot:activator="{ props }">
      <div
        class="custom-date-input"
        v-bind="props"
        @click="showDatePicker = true"
      >
        <button class="nav-button" @click.stop="prevDay">
          <v-icon>mdi-chevron-left</v-icon>
        </button>

        <div class="date-display no-wrap overflow-hidden fs-12">{{ formattedDate }}</div>

        <div class="controls">
          <button class="nav-button" @click.stop="nextDay">
            <v-icon>mdi-chevron-right</v-icon>
          </button>
          <button class="calendar-button" @click.stop="showDatePicker = true">
            <v-icon>mdi-calendar-blank-outline</v-icon>
          </button>
        </div>
      </div>
    </template>

    <!-- Кастомный DatePicker -->
    <CustomDatePicker
      v-model="date"
      @update:model-value="updateDate"
      @click:save="showDatePicker = false"
    ></CustomDatePicker>
  </v-menu>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useDateFormat } from "@vueuse/core";

const props = defineProps({
  controls: { type: Boolean, default: false },
  solo: { type: Boolean, default: true },
  date: { type: [String, Date], default: null },
});

const emits = defineEmits(["update:date"]);

const date = ref(props.date);
const showDatePicker = ref(false);

const formattedDate = computed(() => {
  if (!date.value) return "";

  const formatted = useDateFormat(date.value, "ddd, D MMM", {
    locales: "ru-RU",
  }).value;

  const [dayOfWeek, rest] = formatted.split(", ");
  const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

  return `${capitalizedDay}, ${rest}`;
});

watch(
  () => props.date,
  (newDate) => {
    if (newDate !== date.value) {
      date.value = newDate;
    }
  }
);

const updateDate = () => {
  emits("update:date", date.value);
  showDatePicker.value = false;
};

const prevDay = () => {
  if (!date.value) return;
  const newDate = new Date(date.value);
  newDate.setDate(newDate.getDate() - 1);
  date.value = newDate;
  updateDate();
};

const nextDay = () => {
  if (!date.value) return;
  const newDate = new Date(date.value);
  newDate.setDate(newDate.getDate() + 1);
  date.value = newDate;
  updateDate();
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;

.custom-date-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: f.toVW(140px);
  padding: f.toVH(4px) f.toVW(8px);
  border: 1px solid #ccc;
  border-radius: 40px;
  background-color: transparent;
  cursor: pointer;
  height: 100%;

  .date-display {
    text-align: center;
    color: #666;
    flex-grow: 1;
  }

  .nav-button,
  .calendar-button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    i {
      font-size: f.toVW(20px);
      color: #666;
    }
  }

  .controls {
    display: flex;
    align-items: center;
    gap: f.toVW(8px);
  }

  @media (max-width: 1023px) {
    min-width: f.toVW(110px, 1023px);
    font-size: f.toVW(10px, 1023px);
    .controls {
      gap: f.toVW(4px, 1023px);
    }
    .nav-button,
    .calendar-button {
      i {
        font-size: f.toVW(18px, 1023px);
      }
    }
  }
}
</style>
