<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Date, String],
    default: null
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const menu = ref(false)
const date = ref(null)

watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    date.value = null
    return
  }
  
  if (typeof newVal === 'string') {
    date.value = new Date(newVal)
  } else if (newVal instanceof Date) {
    date.value = newVal
  }
}, { immediate: true })

function updateDate(newDate) {
  if (!newDate) {
    date.value = null
    emit('update:modelValue', null)
    return
  }

  const d = new Date(newDate)
  if (isNaN(d.getTime())) {
    console.error('Invalid date:', newDate)
    return
  }

  date.value = d
  emit('update:modelValue', d)
  menu.value = false
}
</script>

<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="props"
        :model-value="date ? date.toLocaleDateString() : ''"
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
    <v-date-picker

      v-model="date"
      @update:model-value="updateDate"
      no-title
      @click:cancel="menu = false"
    />
  </v-menu>
</template>