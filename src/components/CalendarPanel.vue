<template>
  <v-toolbar tag="div" color="white" height="56" elevation="3">
    <CustomCardDropdown :selected="'music-loft-rehearsal'" :items="items" />
    <v-spacer></v-spacer>
    <div class="controls-wrapper d-flex align-center">
      <!-- Передаем selectedView как пропс и слушаем событие update:selectedView -->
      <CustomButtonsPanel
        :values="{ today: 'Сегодня', week: 'Неделя', month: 'Месяц' }"
        :selected="calendarSettings.view"
        @update:selectedView="handleViewChange"
        :height="36"
      />
      <!-- Передаем date как пропс и слушаем событие update:date -->
      <CustomDateInput
        :solo="true"
        :controls="true"
        :date="calendarSettings.date"
        @update:date="handleDateChange"
      />
      <v-btn icon="mdi-help" color="secondary"></v-btn>
      <v-btn icon="mdi-menu" color="secondary"></v-btn>
      <v-btn icon="mdi-arrow-top-right" color="secondary"></v-btn>
    </div>
  </v-toolbar>
</template>

<script setup>
import { reactive } from "vue";
import CustomButtonsPanel from "@/components/UI/CustomButtonsPanel.vue";
import CustomCardDropdown from "@/components/UI/CustomCardDropdown.vue";
import CustomDateInput from "./UI/CustomDateInput.vue";
import { useStore } from "vuex";

const store = useStore();
const items = store.state.data.studioCards;

// Реактивный объект для настроек календаря
const calendarSettings = reactive({
  view: "day",
  place: "music-loft-rehearsal",
  date: new Date(),
});

// Обработчик изменения вида
const handleViewChange = (newView) => {
  calendarSettings.view = newView;
};

// Обработчик изменения даты
const handleDateChange = (newDate) => {
  calendarSettings.date = newDate;
};
</script>

<style lang="scss" scoped>
.v-toolbar {
  padding-inline: 20px;
  padding-block-start: 20px;
  background-color: white;
  border-radius: 10px 10px 0 0;
}


.v-btn{
border: 2px solid #E0E0E0;
}

.controls-wrapper {
  height: 30px;
 gap: 8px;
}
</style>