<template>
  <div class="calendar-wrapper">
    <CalendarPanel />
    <Calendar :settings="settings" />
    <div class="calendar-legend bg-white">
      <div class="d-flex ga-2">
        <div class="d-flex align-center">
          <v-icon size="8" color="grey" class="calendar-legend__icon"> mdi-circle </v-icon>
          <span class="calendar-legend__capture">Без статуса</span>
        </div>
        <div class="d-flex align-center">
          <v-icon size="8" color="orange" class="calendar-legend__icon"> mdi-circle </v-icon>
          <span class="calendar-legend__capture">Зарезервировано</span>
        </div>
        <div class="d-flex align-center">
          <v-icon size="8" color="amber" class="calendar-legend__icon"> mdi-circle </v-icon>
          <span class="calendar-legend__capture">Частично оплачено</span>
        </div>
        <div class="d-flex align-center">
          <v-icon size="8" color="green" class="calendar-legend__icon"> mdi-circle </v-icon>
          <span class="calendar-legend__capture">Оплачено</span>
        </div>
        <div class="d-flex align-center">
          <v-icon size="8" color="blue" class="calendar-legend__icon"> mdi-circle </v-icon>
          <span class="calendar-legend__capture">Выбрано</span>
        </div>
        <div class="d-flex align-center">
          <v-icon size="8" color="black" class="calendar-legend__icon"> mdi-circle </v-icon>
          <span class="calendar-legend__capture">Закрытый заказ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CalendarPanel from "./CalendarPanel.vue";
import Calendar from "@/components/calendar/Calendar.vue";

const store = useStore();
const settings = computed(() => store.state.calendar.calendarState);
</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;

.calendar-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0 0 f.toVH(44px) f.toVW(20px);
  border-radius: 10px;
  margin-block-end: auto;
  width: 100%;
  @media (max-width: 1024px) {
    aspect-ratio: unset;
  }
}
.calendar-legend {
  padding-top: f.toVH(16px);
  &__capture {
    font-size: f.toVW(10px);
    color: #939292;
  }
  &__icon {
    margin-inline-end: f.toVW(4px);
  }
}

</style>
