<template>
  <v-toolbar tag="div" color="white">
    <CustomCardDropdown
      v-model="calendarSettings.location"
      :selected="'music-loft-rehearsal'"
      :items="items"
      @update:modelValue="handleLocationChange"
    />
    <v-spacer></v-spacer>
    <div class="controls-wrapper d-flex align-center flex-nowrap">
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
      <div class="button-group">
        <v-btn
          icon="mdi-help"
          color="secondary"
          density="compact"
          variant="outlined"
          style='width: none; height: none;'
        ></v-btn>
        <v-btn
          icon="mdi-menu"
          color="secondary"
          density="compact"
          variant="outlined"
          style='width: none; height: none;'
        ></v-btn>
        <v-btn
          icon="mdi-arrow-top-right"
          color="secondary"
          density="compact"
          variant="outlined"
          style='width: none; height: none;'
        ></v-btn>
      </div>
    </div>
  </v-toolbar>
</template>

<script setup>
import { reactive, watch } from "vue";
import CustomButtonsPanel from "@/components/UI/CustomButtonsPanel.vue";
import CustomCardDropdown from "@/components/UI/CustomCardDropdown.vue";
import CustomDateInput from "../UI/CustomDateInput.vue";
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

watch(
  calendarSettings,
  (newSettings) => {
    store.commit("calendar/SET_CALENDAR_STATE", newSettings);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;

.v-toolbar {
  padding-inline-end: f.toVW(20px);
  padding-block-start: 20px;
  background-color: white;
  border-radius: 10px 10px 0 0;
  min-height: 56px;
  min-width: 600px;

  .v-btn {
    outline-color: #e0e0e0;
  }

  .controls-wrapper {
    flex-wrap: wrap;
    gap: 8px;
    height: 2.1vmax;
    @media (max-width: 1023px) {
      height: 2.93vmax;
    }
  }

  .button-group {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 100%;

    .v-btn {
      aspect-ratio: 1 / 1;
      min-width: auto;
      padding: 0;
    }
  }
}

.v-btn--icon.v-btn--density-compact {
  width: unset;
  height: unset;
}
</style>
