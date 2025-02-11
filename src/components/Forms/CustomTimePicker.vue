<template>
  <div class="time-picker-wrapper">
    <v-text-field
      :model-value="displayTime"
      readonly
      variant="solo"
      density="comfortable"
      hide-details
      class="time-input"
      @click="showPicker = true"
    />

    <v-menu
      v-model="showPicker"
      :close-on-content-click="false"
      location="bottom start"
      attach=".time-picker-wrapper"
      :offset="[0, 10]"
    >
      <v-card class="time-picker-card pa-4">
        <div class="d-flex align-center gap-4">
          <div class="time-section">
            <div class="time-label">C</div>
            <v-text-field
              v-model="startTime"
              type="time"
              variant="solo"
              density="comfortable"
              hide-details
              class="time-field"
            />
          </div>
          <div class="time-section">
            <div class="time-label">До</div>
            <v-text-field
              v-model="endTime"
              type="time"
              variant="solo"
              density="comfortable"
              hide-details
              class="time-field"
            />
          </div>
          <v-checkbox
            v-model="isFullDay"
            label="Весь день"
            hide-details
            density="comfortable"
          />
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ start: '', end: '', isFullDay: false })
  }
});
const emit = defineEmits(['update:modelValue']);

const showPicker = ref(false);
const startTime = ref(props.modelValue.start || '11:00');
const endTime = ref(props.modelValue.end || '12:00');
const isFullDay = ref(props.modelValue.isFullDay || false);

const displayTime = computed(() => {
  if (isFullDay.value) return 'Весь день';
  if (!startTime.value || !endTime.value) return '';
  return `${startTime.value} - ${endTime.value}`;
});

watch([startTime, endTime, isFullDay], () => {
  emit('update:modelValue', {
    start: startTime.value,
    end: endTime.value,
    isFullDay: isFullDay.value
  });
});

watch(isFullDay, (newValue) => {
  if (newValue) {
    startTime.value = '';
    endTime.value = '';
  } else {
    startTime.value = '11:00';
    endTime.value = '12:00';
  }
});
</script>

<style lang="scss" scoped>
.time-picker-wrapper {
  position: static;
  overflow: visible;
}

.time-input {
  width: 200px;

  [class*="v-field"] {
    background: #f6f7f8;
    border-radius: 4px;
  }

  [class*="v-field__outline"] {
    display: none;
  }

  [class*="v-field__input"] {
    padding: 8px 12px;
    min-height: unset;
  }
}

.time-picker-card {
  min-width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.time-section {
  .time-label {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 4px;
  }

  .time-field {
    width: 120px;

    [class*="v-field"] {
      background: #f6f7f8;
      border-radius: 4px;
    }

    [class*="v-field__outline"] {
      display: none;
    }

    [class*="v-field__input"] {
      padding: 8px 12px;
      min-height: unset;
    }
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
</style>