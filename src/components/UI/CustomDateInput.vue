<template>
  <v-menu
    v-model="showDatePicker"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        v-model="formattedDate"
        readonly
        bg-color="transparent"
        class="border-md"
        style="border-radius: 40px"
        variant="plain"
        hide-details
        prepend-icon="mdi-chevron-left"
        append-icon="mdi-chevron-right"
        append-inner-icon="mdi-calendar-blank-outline"
        density="compact"
        :min-width="160"
        @click:prepend="goTo(-1)"
        @click:append="goTo(1)"
        @click:append-inner-icon="showDatePicker = true"
        v-bind="props"
      />
    </template>
    
    <v-date-picker
      v-model="date"
      @update:model-value="updateDate"
      @click:save="showDatePicker = false"
    />
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
  return date.value
    ? useDateFormat(date.value, "DD MMM YYYY", { locales: "ru-RU" }).value
    : "";
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

const goTo = (direction) => {
  if (!date.value) return;

  const newDate = new Date(date.value);
  newDate.setDate(newDate.getDate() + direction);
  date.value = newDate;

  updateDate();
};
</script>