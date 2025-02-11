<template>
  <v-navigation-drawer
    v-model="isOpen"
    location="right"
    temporary
    width="400"
    style='z-index: 9999;'
  >
    <!-- Заголовок и кнопка -->
    <v-toolbar flat class="px-4">
      <v-btn
        variant="text"
        icon="mdi-arrow-left"
        @click="isOpen = false"
      />
      <v-toolbar-title>Описание оборудования</v-toolbar-title>
    </v-toolbar>

    <!-- Основной контент -->
    <div class="pa-4">
      <div class="equipment-image mb-4">
        <v-img
          :src="item?.description.image"
          height="200"
          cover
          class="rounded-lg"
        />
      </div>
      <h3 class="text-h6 mb-4">{{ item?.name }}</h3>
      <div class="text-subtitle-1 mb-2">Основные характеристики:</div>
      <v-list density="compact" class="bg-transparent">
        <v-list-item
          v-for="(spec, index) in item?.description.characteristics"
          :key="index"
          :title="spec"
          prepend-icon="mdi-circle-small"
        />
      </v-list>
      <div class="text-body-1 mt-4">{{ item?.description.text }}</div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  item: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Отслеживание изменений в оборудовании
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      console.log('Оборудование обновлено:', newItem);
    }
  },
  { immediate: true }
);
</script>
