<template>
	<div class="calendar-wrapper">
		<CalendarPanel />
		<Calendar :settings="settings"/>
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

<style scoped>

</style>