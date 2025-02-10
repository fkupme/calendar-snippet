<template>
  <v-container fluid>
    <LeftSidebar />
    <v-row>
    </v-row >
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
import LeftSidebar from "./LeftSideBar.vue";
import CalendarView from "./CalendarView.vue";
import RightSidebar from "./RightSideBar.vue";
</script>


<style scoped>

</style>