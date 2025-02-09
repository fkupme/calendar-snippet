<template>
    <template v-if="solo">
      <v-date-input
        bgColor='transparent'
        class="border-md"
        style='border-radius: 40px; height: 40px;'
        v-model="date"
        :placeholder="FormattedDate"
        hide-details
        nextIcon="mdi-chevron-right"
        prevIcon="mdi-chevron-left"
        prependInner="false"
        prependIcon='false'
        appendInnerIcon="mdi-calendar-blank-outline"
        @input="updateDate"
      ></v-date-input>
    </template>
    <template v-else> 
      <v-date-input
        bgColor='transparent'
        class="border-md"
        style='border-radius: 40px;'
        v-model="date"
        :placeholder="FormattedDate"
        hide-details
        nextIcon="mdi-chevron-right"
        prevIcon="mdi-chevron-left"
        prependInner="false"
        prependIcon='false'
        appendInnerIcon="mdi-calendar-blank-outline"
      ></v-date-input>
      <v-date-input
        bgColor='transparent'
        class="border-md"
        style='border-radius: 40px;'
        v-model="date"
        :placeholder="FormattedDate"
        hide-details
        nextIcon="mdi-chevron-right"
        prevIcon="mdi-chevron-left"
        prependInner="false"
        prependIcon='false'
        appendInnerIcon="mdi-calendar-blank-outline"
      ></v-date-input>
    </template>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineProps, defineEmits } from "vue";
import format from "date-fns/format";
import ruLocale from "date-fns/locale/ru";
import { VDateInput } from "vuetify/labs/components";

const props = defineProps({
  controls: { type: Boolean, default: false },
  solo: {type: Boolean, default: true},
  date: { type: [String, Date], default: null },
});

const date = ref(props.date);
const emits = defineEmits(["update:date"]);



const formattedDate = computed(() => {
  return date.value ? format(date.value, "dd MMM yyyy", { locale: ruLocale }) : '';
});


watch(date, (newDate) => {
  if (typeof newDate === 'string') {
    date.value = new Date(newDate);
  }
});  
</script>

<style scoped>
.v-date-input {
}
</style>