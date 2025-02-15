<template>
  <v-navigation-drawer
    v-model="isOpen"
    location="right"
    temporary
    :width="drawerWidth"
    style='top: 0; height: 100%;'
  >
    <div class="drawer-wrapper bgc-primary">
      <div class="drawer-content bgc-secondary">
        <!-- Заголовок и кнопка -->
        <v-toolbar flat class="px-4">
          <v-btn
            variant="text"
            icon="mdi-arrow-left"
            @click="isOpen = false"
          />
          <v-toolbar-title>{{ item?.name }}</v-toolbar-title>
        </v-toolbar>

        <!-- Изображение -->
        <v-img 
          :src="item?.description.image" 
          class="item-image" 
          cover 
        />

        <!-- Описание и характеристики -->
        <div class="pa-4">
          <div class="text-h6 mb-2">Описание</div>
          <p class="text-body-2 mb-4">{{ item?.description.text }}</p>

          <div class="text-h6 mb-2">Характеристики</div>
          <v-list density="compact">
            <v-list-item 
              v-for="(spec, index) in item?.description.characteristics" 
              :key="index"
              class="px-0"
            >
              <v-list-item-title class="text-subtitle-2">
                {{ spec }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </div>
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
  },
  drawerWidth: {
    type: Number,
    default: 400,
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});


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

<style lang="scss" scoped>
.drawer-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}

.drawer-content {
  width: clamp(400px, 50%, 600px);
  margin-inline: auto;
  border-radius: 40px;
  max-height: 90vh;
  overflow-y: auto;
}

.item-image {
  height: 300px;
  border-radius: 0 0 40px 40px;
}

.v-navigation-drawer {
  overflow-x: hidden;
  
  @media (max-width: 1023px) { 
    width: 100% !important; 
    max-width: 100vw;
    z-index: 9999;
  }
}
</style>
