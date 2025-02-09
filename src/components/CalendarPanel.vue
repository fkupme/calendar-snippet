<template>
  <v-toolbar tag="div" color="white" height="56">
    <CustomCardDropdown
      v-model='calendarSettings.location'
      :selected="'music-loft-rehearsal'"
      :items="items"
      @update:modelValue="handleLocationChange"
    />
    <v-spacer></v-spacer>
    <div class="controls-wrapper d-flex align-center">
      <CustomButtonsPanel
        v-model="calendarSettings.view"
        :values="{ day: 'Сегодня', week: 'Неделя', month: 'Месяц' }"
        :selected="calendarSettings.view"
        @update:selectedView="handleViewChange"
      />
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
import { reactive, watch } from "vue";
import CustomButtonsPanel from "@/components/UI/CustomButtonsPanel.vue";
import CustomCardDropdown from "@/components/UI/CustomCardDropdown.vue";
import CustomDateInput from "./UI/CustomDateInput.vue";
import { useStore } from "vuex";

const store = useStore();
const items = store.state.data.studioCards;
const settings = store.state.calendar.calendarState;

const calendarSettings = reactive({
  view: settings.view || "day",
  location: settings.location || "music-loft-rehearsal",
  date: settings.date ? new Date(settings.date) : new Date(),
});

const handleViewChange = (newView) => {
  calendarSettings.view = newView;
};

const handleDateChange = (newDate) => {
  calendarSettings.date = newDate;
};

const handleLocationChange = (newLocation) => {
  calendarSettings.location = newLocation;
};

watch(calendarSettings, (newSettings) => {
  store.commit("calendar/SET_CALENDAR_STATE", newSettings);
}, { immediate: true });
</script>

<style lang="scss" scoped>
.v-toolbar {
  padding-inline: 20px;
  padding-block-start: 20px;
  background-color: white;
  border-radius: 10px 10px 0 0;
}

.v-btn {
  border: 2px solid #E0E0E0;
}

.controls-wrapper {
  flex-wrap: wrap;
  gap: 8px;
}
</style>