<template>
  <v-btn-toggle
    density="compact"
    v-model="selected"
    @update:model-value="selectView"
    class="border-md button-panel"
    mandatory
    variant="flat"
    divided
  >
    <v-btn
      v-for="(label, value) in props.values"
      :key="value"
      :value="value"
      class="button-panel__btn font-weight-medium flex-1-1-0"
      :class='`fs-${props.font}`'
      :ripple="false"
    >
      {{ label }}
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
import { shallowRef, defineEmits } from "vue";

const props = defineProps({
  values: {
    type: Object,
    default: () => ({ day: "Сегодня", week: "Неделя", month: "Месяц" }),
  },
  font: {
    type: String,
    default: "14",
  },
});

const emit = defineEmits(["update:selectedView"]);

const selected = shallowRef(Object.keys(props.values)[0]);

const selectView = (view) => {
  selected.value = view;
  emit("update:selectedView", view);
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;

:deep(.v-btn--size-default){
  min-width: 0;
  width: 100%;
  height: 100%;
}
.v-btn-group--density-compact.v-btn-group {
    height: 100%;
}
.v-btn-group--divided .v-btn:not(:last-child) {
    border-inline-end-style: none;
    border-inline-end-color: transparent;
}
.button-panel {
  border-radius: 40px;
  width: 100%;
}

.v-btn {
  border: none;
  border-radius: 40px;
  color: #939292;
  text-transform: none;
  overflow: hidden;
  padding: f.toVH(4.5px)f.toVW(8px);
  transition: 0.3s ease-in;

  &--active {
    background: #252529;
    color: #fff;
    transition: 0.3s ease-in;
  }
}
</style>
