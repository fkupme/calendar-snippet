<template>
  <div class="date-field">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      min-width="auto"
      :offset="5"
      location="bottom"
      position="start"
    >
      <!-- Активатор -->
      <template v-slot:activator="{ props }">
        <v-text-field
          v-bind="props"
          :model-value="formattedDateForField"
          :label="label"
          readonly
          variant="solo"
          density="compact"
          class="date-field__input input-hover-focus fs-14 font-weight-medium"
          hide-details
          placeholder="Выберите дату"
          clearable
          @click:clear="updateDate(null)"
        >
          <template v-slot:append-inner>
            <v-icon class="date-field__icon input-icon-hover">mdi-calendar</v-icon>
          </template>
        </v-text-field>
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
  </div>
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
    })}`.replace(/^(\w)/, (match) => match.toUpperCase());
  }

  // Если передан параметр end
  if (props.end) {
    return `По ${d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`
  }

  // По умолчанию
  return d
    .toLocaleString("ru-RU", {
      weekday: "short",
      day: "2-digit",
      month: "long",
    })
    .replace(".", ",").replace(/^(\w)/, (match) => match.toUpperCase());
});


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
@use "@/assets/styles/functions" as f;
.date-field {
  position: relative;
  max-width: 300px;

  &__input {
    :deep(.v-field__input) {
      min-height: 44px;
      padding: 0 12px;
    }
  }
}
</style>
