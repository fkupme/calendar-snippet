<template>
  <v-select
    v-model="selectedValue"
    bg-color="transparent"
    :items="items"
    :menu-props="{ maxHeight: '600', closeOnBack: true }"
    item-title="title"
    item-value="value"
    single-line
    hide-details
    @update:model-value="update"
  >

    <template #item="{ item, props }">
      <div v-bind="props" class="custom-option d-flex align-center">
        <div class="mr-3">
          <img
            :src="item.raw?.avatar || item.avatar"
            alt="Avatar"
            style="width: 36px; height: 36px; border-radius: 50%;"
          />
        </div>
        <div>
          <div class="text-body-2">{{ item.raw?.title || item.title }}</div>
          <div class="text-subtitle-1">
            {{ item.raw?.subtitle || item.subtitle }}
          </div>
        </div>
      </div>
    </template>

    <template #selection="{ item }">
      <div v-if="item" class="d-flex align-center">
        <div class="mr-3">
          <img
            :src="item.raw?.avatar || item.avatar"
            alt="Avatar"
            style="width: 36px; height: 36px; border-radius: 50%;"
          />
        </div>
        <div>
          <div class="text-body-2">{{ item.raw?.title || item.title }}</div>
          <div class="text-subtitle-1">
            {{ item.raw?.subtitle || item.subtitle }}
          </div>
        </div>
      </div>
    </template>
  </v-select>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  selected: {
    type: [String, Number],
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref(props.selected || null);

watch(
  () => props.selected,
  (newValue) => {
    selectedValue.value = newValue;
  }
);


const update = (value) => {
  emit("update:modelValue", value);
};
</script>

<style scoped>
.custom-option {
  padding: 8px;
}
</style>