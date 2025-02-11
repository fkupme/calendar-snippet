<template>
  <div class="selected-item pa-2 d-flex align-center justify-space-between bg-grey-lighten-4 rounded mb-2">
    <div class="d-flex align-center">
      <v-img
        :src="item.image"
        width="40"
        height="40"
        class="rounded mr-3"
      />
      <div>
        <div class="text-subtitle-2">{{ item.name }}</div>
        <div class="text-caption text-grey">{{ item.availability }}</div>
      </div>
    </div>
    <div class="d-flex align-center">
      <div class="price mr-4">{{ item.price }}₽</div>
      <v-btn
        icon="mdi-minus"
        variant="text"
        density="comfortable"
        @click="$emit('decrease')"
      />
      <span class="mx-2">{{ item.inStock }}</span>
      <v-btn
        icon="mdi-plus"
        variant="text"
        density="comfortable"
        @click="$emit('increase')"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
});

defineEmits(['increase', 'decrease']);
</script>