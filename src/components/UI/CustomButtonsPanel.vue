<template>
  <v-btn-toggle
    density="compact"
    v-model="selected"
    @update:model-value="selectView"
    class="border-md button-panel"
    :height="props.height"
    mandatory
    variant="flat"
    divided
  >
    <v-btn
      v-for="(label, value) in props.values"
      :key="value"
      :value="value"
      :class="[
        'button-panel__btn',
        { 'rounded-full': isMediumScreen && selected !== value },
        { 'compact-btn': isMediumScreen && selected !== value }
      ]"
    >
      <span v-if="isMediumScreen && selected !== value">{{ label[0] }}</span>
      <span v-else>{{ label }}</span>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
import { shallowRef, defineEmits, computed } from "vue";

const props = defineProps({
  height: { type: Number, default: 30 },
  values: {
    type: Object,
    default: () => ({ day: "Сегодня", week: "Неделя", month: "Месяц" }),
  },
  isMediumScreen: { type: Boolean, default: false },
});

const emit = defineEmits(["update:selectedView"]);

const selected = shallowRef(Object.keys(props.values)[0]);

const selectView = (view) => {
  selected.value = view;
  emit("update:selectedView", view);
};
</script>

<style lang="scss" scoped>
.button-panel {
  border-radius: 40px;
  min-width: 250px;

  @media (max-width: 1200px) {
    min-width: 100px;
  }
}

.v-btn {
  border-radius: 40px;
  color: #939292;
  text-transform: none;
  overflow: hidden;
  transition: 0.3s ease-in;

  &--active {
    background: #000;
    color: #fff;
    transition: 0.3s ease-in;
  }

  &.rounded-full {
    border-radius: 50%;
  }

  &.compact-btn {
    min-width: 32px;
    padding: 0 8px;

    .v-btn__content {
      justify-content: center;
    }
  }
}
</style>