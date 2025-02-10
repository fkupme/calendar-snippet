<template>
	<div class="calendar-wrapper">
		<CalendarPanel />
		<Calendar  :settings="settings"/>
		<div class="calendar__legend bg-white">
      <div class="d-flex gap-4">
        <div class="d-flex align-center">
          <v-icon
            size="small"
            color="grey"
            class="me-1"
          >
            mdi-circle
          </v-icon>
          <span class="text-caption">Без статуса</span>
        </div>
        <div class="d-flex align-center">
          <v-icon
            size="small"
            color="orange"
            class="me-1"
          >
            mdi-circle
          </v-icon>
          <span class="text-caption">Зарезервировано</span>
        </div>
        <div class="d-flex align-center">
          <v-icon
            size="small"
            color="amber"
            class="me-1"
          >
            mdi-circle
          </v-icon>
          <span class="text-caption">Частично оплачено</span>
        </div>
        <div class="d-flex align-center">
          <v-icon
            size="small"
            color="green"
            class="me-1"
          >
            mdi-circle
          </v-icon>
          <span class="text-caption">Оплачено</span>
        </div>
        <div class="d-flex align-center">
          <v-icon
            size="small"
            color="blue"
            class="me-1"
          >
            mdi-circle
          </v-icon>
          <span class="text-caption">Выбрано</span>
        </div>
        <div class="d-flex align-center">
          <v-icon
            size="small"
            color="black"
            class="me-1"
          >
            mdi-circle
          </v-icon>
          <span class="text-caption">Закрытый заказ</span>
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
.calendar-wrapper {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	padding: 20px;
}
.calendar__legend { 
	padding-top: 16px;
}

</style>