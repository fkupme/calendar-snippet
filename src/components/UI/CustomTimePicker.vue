<template>
  <div class="time-picker">
    <div class="d-flex align-center bgc-secondary pa-2 ga-2">
      <div class="time-section flex-grow-1">
        <v-text-field
          v-model="startTime"
          type="time"
          variant="flat"
          density="comfortable"
          hide-details
          class="time-field bgc-primary fs-14 font-weight-medium"
          :max="endTime"
          label="С"
        />
      </div>
      <div class="time-section flex-grow-1">
        <v-text-field
          v-model="endTime"
          type="time"
          variant=""
          density="comfortable"
          hide-details
          class="time-field bgc-primary fs-14 font-weight-medium"
          :min="startTime"
          label="До"
        />
      </div>
      <v-checkbox
        v-model="isFullDay"
        label="Весь день"
        hide-details
        density="comfortable"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ 
      start: '11:00', 
      end: '12:00', 
      isFullDay: false 
    })
  }
});

const emit = defineEmits(['update:modelValue']);

const startTime = ref(props.modelValue.start);
const endTime = ref(props.modelValue.end);
const isFullDay = ref(props.modelValue.isFullDay);

// Наблюдатель за изменениями времени
watch([startTime, endTime, isFullDay], () => {
  // Если startTime > endTime, корректируем значения
  if (startTime.value > endTime.value) {
    if (startTime.value === props.modelValue.start) {
      endTime.value = startTime.value; // Корректируем endTime
    } else {
      startTime.value = endTime.value; // Корректируем startTime
    }
  }

  // Эмитим обновленные значения
  emit('update:modelValue', {
    start: startTime.value,
    end: endTime.value,
    isFullDay: isFullDay.value,
  });
});

// Наблюдатель за флагом "Весь день"
watch(isFullDay, (newValue) => {
  if (newValue) {
    startTime.value = '09:00';
    endTime.value = '23:00';
  } else {
    startTime.value = '11:00';
    endTime.value = '12:00';
  }
});
</script>

<style lang="scss" scoped>
.time-picker {
  .time-section {
    :deep(.v-label) {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 4px;
    }
  }

  [class*="v-checkbox"] {
    [class*="v-selection-control"] {
      min-height: unset;
    }

    [class*="v-label"] {
      opacity: 0.7;
      font-size: 14px;
    }
  }
}
</style>
