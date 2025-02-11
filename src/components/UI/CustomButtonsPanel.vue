<template>
  <v-btn-toggle
  density = "compact"
    v-model="selected"
    @update:model-value="selectView"
    class="border-md"
    :height="props.height"
    mandatory
		variant="flat"
    divided
  >
    <template v-for="(label, value) in values" :key="value">
      <v-btn :value="value">
        {{ label }}
      </v-btn>
    </template>
  </v-btn-toggle>
</template>

<script setup>
import { shallowRef, defineEmits, watch,} from "vue";

const props = defineProps({
  height: { type: Number, default: 30 },
  values: {
    type: Object,
    default: () => ({ day: "Сегодня", week: "Неделя", month: "Месяц" }),
  },
});

const emit = defineEmits(["update:selectedView"]);

const pairs = Object.entries(props.values);


const selected = shallowRef("today");

const selectView = (view) => {
  selected.value = view;
  emit("update:selectedView", view);
};

watch
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
