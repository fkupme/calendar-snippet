<template>
  <v-container fluid>
    <v-row>
    </v-row >
    <v-row>
      <v-col>
        <LeftSidebar />
      </v-col>

      <v-col cols="8">
        <CalendarView />
      </v-col>

      <v-col cols="3">

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import LeftSidebar from "./LeftSideBar.vue";
import CalendarView from "./CalendarView.vue";
import RightSidebar from "./RightSideBar.vue";
</script>


<style scoped>

</style>