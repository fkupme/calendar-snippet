<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
    origin="overlap"
  >
    <!-- Активатор -->
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="props"
        :model-value="formattedDateForField"
        :label="label"
        readonly
        clearable
        @click:clear="updateDate(null)"
        variant="solo"
        density="comfortable"
        hide-details
        placeholder="Выберите дату"
      />
    </template>

    <!-- Контент меню -->
    <template v-slot:default>
      <CustomDatePicker
        v-model="date"
        @update:model-value="updateDate"
        @click:cancel="menu = false"
      />
    </template>
  </v-menu>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import CustomDatePicker from "@/components/UI/CustomDatePicker.vue";

const props = defineProps({
  modelValue: {
    type: [Date, String],
    default: null,
  },
  label: {
    type: String,
    default: "",
  },
  start: {
    type: Boolean,
    default: false,
  },
  end: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const menu = ref(false);
const date = ref(null);

// Форматирование даты для поля ввода
const formattedDateForField = computed(() => {
  if (!date.value) return "";

  const d = new Date(date.value);

  // Если передан параметр start
  if (props.start) {
    return `С ${d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`;
  }

  // Если передан параметр end
  if (props.end) {
    return `По ${d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`;
  }

  // По умолчанию (если start и end не переданы)
  return d
    .toLocaleString("ru-RU", {
      weekday: "short",
      day: "2-digit",
      month: "long",
    })
    .replace(".", ",");
});

// Синхронизация с внешним значением modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      date.value = null;
      return;
    }
    if (typeof newVal === "string") {
      date.value = new Date(newVal);
    } else if (newVal instanceof Date) {
      date.value = newVal;
    }
  },
  { immediate: true }
);

// Обновление даты и отправка события в родительский компонент
function updateDate(newDate) {
  if (!newDate) {
    date.value = null;
    emit("update:modelValue", null);
    return;
  }
  const d = new Date(newDate);
  if (isNaN(d.getTime())) {
    console.error("Invalid date:", newDate);
    return;
  }
  date.value = d;
  emit("update:modelValue", d);
  menu.value = false;
}
</script>

<style lang="scss" scoped>
:deep(.v-date-picker) {
  background: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  .date-header {
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .v-btn--icon {
      background: transparent;
      color: rgba(0, 0, 0, 0.87);
      &:hover {
        background: transparent;
      }
    }
  }
  .v-date-picker-month__day {
    border: none;
    border-radius: 4px;
    &--selected {
      background: black;
      color: white;
    }
    &:hover:not(&--selected) {
      background-color: #f5f5f5;
    }
  }
}
</style>
