<template>
  <div>
    <v-toolbar>
      <!-- Кастомный v-select -->
      <v-select
        color="primary"
        v-model="selectValue"
        :items="options"
        item-title="title"
        item-value="value"
        single-line
        hide-details
      >
        <!-- Кастомизация опций -->
        <template #item="{ item, props }">
          <div v-bind="props" class="custom-option d-flex align-center">
            <div class="mr-3">
              <img
                :src="useImageUrl(item.avatar)"
                alt="Avatar"
                style="width: 36px; height: 36px; border-radius: 50%"
              />
            </div>
            <div>
              <div class="text-subtitle-1">{{ item.title }}</div>
              <div class="text-caption font-weight-bold text-lowercase">
                {{ item.subtitle }}
              </div>
            </div>
          </div>
        </template>

        <!-- Кастомизация выбранного значения -->
        <template #selection="{ item }">
          <div class="d-flex align-center">
            <div class="mr-3">
              <img
                :src="useImageUrl(item.avatar)"
                alt="Avatar"
                style="width: 36px; height: 36px; border-radius: 50%"
              />
            </div>
            <div>
              <div class="text-subtitle-1">{{ item.title }}</div>
              <div class="text-caption font-weight-bold text-lowercase">
                {{ item.subtitle }}
              </div>
            </div>
          </div>
        </template>
      </v-select>

      <v-spacer></v-spacer>

      <!-- v-btn-toggle для выбора периода (Сегодня, Неделя, Месяц) -->
      <v-btn-toggle v-model="selected" @change="selectView" mandatory>
        <v-btn value="today">Сегодня</v-btn>
        <v-btn value="week">Неделя</v-btn>
        <v-btn value="month">Месяц</v-btn>
      </v-btn-toggle>

      <v-spacer></v-spacer>

      <v-date-input
        label="Date of birth"
        prepend-icon=""
        variant="outlined"
        persistent-placeholdera
      ></v-date-input>
    </v-toolbar>
  </div>
</template>

<script setup>
import { shallowRef, watch, ref } from "vue";
import useImageUrl from "@/utils/useImageUrl";

// Props
const props = defineProps({
  selectedView: { type: String, default: "today", required: true },
  selectedDate: {
    type: String,
    default: () => new Date().toISOString().substr(0, 10),
    required: true,
  },
  options: { type: Array, default: () => [], required: true },
});

// Emits
const emit = defineEmits(["update:selectedView"]);

// Локальные переменные
const selectValue = ref(null);
const selected = shallowRef("today");
const date = shallowRef(() => new Date().toISOString().substr(0, 10));

// Обработка изменения периода
const selectView = (view) => {
  selected.value = view;
  emit("update:selectedView", view);
};

// Следим за изменениями props
watch(
  () => props.selectedView,
  (newVal) => {
    selected.value = newVal;
  }
);
</script>

<style lang="scss" scoped>
.v-toolbar {
  background: transparent;
}
.v-select {
  background: transparent;
}
.v-btn-toggle {
  border-radius: 40px;
}
.v-btn {
  border-radius: 40px;
  &--active {
    background: transparent;
  }
}
.custom-option {
  padding: 8px;
}
</style>
