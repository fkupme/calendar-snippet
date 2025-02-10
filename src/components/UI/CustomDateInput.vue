<template>
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
    persistent-placeholder
  >
    <template #append-inner>
      <v-date-input
        v-model="date"
        @update:model-value="updateDate"
        hide-details
        style="display: none"
      />
    </template>
  </v-text-field>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineProps, defineEmits } from "vue";
import { VDateInput } from "vuetify/labs/components";
import { useDateFormat } from "@vueuse/core";

// Props
const props = defineProps({
  controls: { type: Boolean, default: false },
  solo: { type: Boolean, default: true },
  date: { type: [String, Date], default: null },
});

// Emits
const emits = defineEmits(["update:date"]);

// Reactive state
const date = ref(props.date);

// Computed property for formatted date
const formattedDate = computed(() => {
  return date.value
    ? useDateFormat(date.value, "DD MMM YYYY", { locales: "ru-RU" }).value
    : "";
});

// Watch for changes in the date prop
watch(
  () => props.date,
  (newDate) => {
    if (newDate !== date.value) {
      date.value = newDate;
    }
  }
);

// Emit updated date to parent
const updateDate = () => {
  emits("update:date", date.value);
};

// Change date using prepend/append icons
const goTo = (direction) => {
  if (!date.value) return;

  const newDate = new Date(date.value);
  newDate.setDate(newDate.getDate() + direction);
  date.value = newDate;

  updateDate();
};
</script>
