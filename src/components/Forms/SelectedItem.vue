<template>
  <div 
    class="selected-item pa-2 d-flex align-center justify-space-between  rounded mb-2"
  >
    <div class="d-flex align-center">
      <v-img
        :src="item.image"
        width="40"
        height="40"
        class="item-image rounded mr-3 pa-2 border"
      />
      <div class="d-flex flex-column ga-1">
        <div class="fs-14 font-weight-medium">{{ item.name }}</div>
        <span class="fs-14 font-weight-medium">{{ item.price }}₽</span>
        <div class="fs-12 text-secondary">
          В наличии {{ item.inStock }}
        </div>
      </div>
    </div>
    <div class="d-flex align-center">
      
      <div class="d-flex align-center">
        <v-btn
          icon="mdi-minus"
          variant="text"
          density="comfortable"
          @click="$emit('decrease')"
          :disabled="!itemCount"
        />
        <span class="mx-2">{{ itemCount }}</span>
        <v-btn
          icon="mdi-plus"
          variant="text"
          density="comfortable"
          @click="$emit('increase')"
          :disabled="isMaxLimitReached"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  itemCount: {
    type: Number,
    default: 0
  },
  maxLimit: {
    type: Number,
    default: Infinity
  }
});

const isMaxLimitReached = computed(() => {
  return props.itemCount >= props.maxLimit || props.itemCount >= props.item.inStock;
});

defineEmits(['increase', 'decrease']);
</script>

<style lang="scss" scoped>
.item-image{
  padding: 5px;
  border-radius: 10px;
}
.selected-item {
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
