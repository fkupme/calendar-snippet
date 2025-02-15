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
        <v-toolbar flat class="bgc-secondary px-4">
          <v-btn
            variant="text"
            icon="mdi-arrow-left"
            @click="isOpen = false"
          />
          <v-toolbar-title class="ml-0 fs-20 font-weight-medium">{{ item?.name }}</v-toolbar-title>
        </v-toolbar>

        <!-- Изображение -->
        <v-img 
          :src="item?.description.image" 
          class="item-image" 
          cover 
        />

        <!-- Описание и характеристики -->
        <div class="pa-4">
          
          <div class="fs-18 font-weight-medium">Основные характеристики</div>
          <v-list density="compact">
            <v-list-item 
              v-for="(spec, index) in item?.description.characteristics" 
              :key="index"
              class="px-0 fs-16"
            >
              <v-list-item-title class="fs-16">
                {{ spec }}
              </v-list-item-title>
            </v-list-item>
            <div class="fs-18 font-weight-medium mb-2">Описание</div>
          <p class="fs-16 mb-4">{{ item?.description.text }}</p>

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
  max-height: 90vh;
  overflow-y: auto;
  
  @media (max-width: 1023px) {
    width: clamp(400px, 50%, 600px);
    margin-inline: auto;
  }
}

@media (max-width: 1023px){
   :deep(.drawer-content){
    width: clamp(400px, 50%, 600px);
    margin-inline: auto;
  }
}

.v-navigation-drawer {
  overflow-x: hidden;
  
  @media (max-width: 1023px) { 
    width: 100% !important; 
    max-width: 100vw;
    z-index: 9999;
  }
}

:deep(.v-navigation-drawer__content) {
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
    
    &-track { background: #f1f1f1; }
    &-thumb { 
      background: #888;
      border-radius: 3px;
    }
  }
}

.item-image {
  margin-inline: auto;
  border-radius: 0 0 40px 40px;
  object-fit: contain;
  width: 176px;
}
</style>
