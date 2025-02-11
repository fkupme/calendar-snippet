<template>
  <v-container fluid>
    <LeftSidebar />
    <NewOrderForm />
    <v-row> </v-row>
    <v-row>
      <v-col cols="9">
        <CalendarView />
      </v-col>

      <v-col cols="3">
        <RightSidebar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import LeftSidebar from "./LeftSideBar";
import CalendarView from "./CalendarView";
import RightSidebar from "./RightSideBar";
import NewOrderForm from "./forms/NewOrderForm";
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 1.25rem;
  height: calc(100dvh - 60px);
  margin-block-end: auto;
}
.layout {
  &-form {
    grid-column: 2 / span 3;
    grid-row: 1;
  }
  &-calendar {
    grid-column: 1 / span 8;
    grid-row: 1 / span 2;
  }
  &-right-sidebar {
  }
}
</style>
