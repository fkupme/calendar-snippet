<template>
  <div class="time-input">
    <v-menu 
      v-model="menu"
      :close-on-content-click="false"
      location="bottom"
      class="time-input__menu"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          v-bind="props"
          :model-value="displayTime"
          @update:model-value="updateTime"
          :label="label"
          variant="solo"
          density="compact"
          class="custom-time-input input-hover-focus fs-14 font-weight-medium"
          hide-details
          placeholder="ЧЧ:ММ"
          :rules="[timeValidationRule]"
          @click:clear="updateTime(null)"
        >
          <template v-slot:append-inner>
            <v-icon class="custom-time-input__icon input-icon-hover">mdi-clock-outline</v-icon>
          </template>
        </v-text-field>
      </template>

      <v-card class="time-input__picker-card">
        <CustomTimePicker
          v-model="timeValue"
          @update:model-value="updateTime"
          @click:cancel="menu = false"
        />
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CustomTimePicker from "@/components/UI/CustomTimePicker.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ start: "", end: "", isFullDay: false }),
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const menu = ref(false);
const timeValue = ref({
  start: props.modelValue.start || "11:00",
  end: props.modelValue.end || "12:00",
  isFullDay: props.modelValue.isFullDay || false,
});

const displayTime = computed(() => {
  if (timeValue.value.isFullDay) return "Весь день";
  if (!timeValue.value.start || !timeValue.value.end) return "";
  return `${timeValue.value.start} - ${timeValue.value.end}`;
});

const updateTime = (newTime) => {
  if (newTime === null) {
    timeValue.value = { start: "", end: "", isFullDay: false };
    emit("update:modelValue", null);
  } else {
    timeValue.value = newTime;
    emit("update:modelValue", timeValue.value);
    menu.value = false;
  }
};
//ДОПИСАТЬ 
const timeValidationRule = (value) => {
  return true;
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;

.time-input {
  position: relative;
  width: 100%;
  max-width: 300px;


    :deep(.v-field__input) {
      min-height: 44px;
      padding: 0 12px;
    }


  &__picker-card {
    min-width: 300px;
    border-radius: 12px;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
    background: #ffffff;
    overflow: hidden;
  }

  &__menu {
    :deep(.v-menu__content) {
      border-radius: 12px;
      background: transparent;
      box-shadow: none;
    }
  }
}

.custom-time-input {

  
  :deep(.v-field__input) {
    min-height: 44px;
    padding: 0 12px;
  }
}
</style>