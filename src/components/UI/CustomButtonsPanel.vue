<template>
  <v-btn-toggle
  size="small"
    v-model="selected"
    @change="selectView"
    class="border-md"
    :height="props.height"
    mandatory
  >
    <template v-for="(label, value) in values" :key="value">
      <v-btn :value="value">
        {{ label }}
      </v-btn>
    </template>
  </v-btn-toggle>
</template>

<script setup>
import { shallowRef, defineProps, defineEmits,} from "vue";

const props = defineProps({
  height: { type: Number, default: 30 },
  values: {
    type: Object,
    default: () => ({ today: "Сегодня", week: "Неделя", month: "Месяц" }),
  },
});

const emit = defineEmits(["update:selectedView"]);

const pairs = Object.entries(props.values);


const selected = shallowRef("today");

const selectView = (view) => {
  selected.value = view;
  emit("update:selectedView", view);
};
</script>

<style lang="scss" scoped>
.v-btn-toggle {
  border-radius: 40px;
}
.v-btn {
  border-radius: 40px;
  color: #939292;
  text-transform: none;
  &--active {
    background: #252529;
  }
}
</style>
