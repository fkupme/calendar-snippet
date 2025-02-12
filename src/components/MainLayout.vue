<template>
  <v-container fluid>
    <LeftSidebar />
    <NewOrderForm />
    <v-row> </v-row>
    <v-row>
      <v-col :cols="isSideBarHide ? 12 : 9">
        <CalendarView />
      </v-col>

      <v-col :cols="isSideBarHide ? 0 : 3">
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
import { computed } from "vue";
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize();


const isSideBarHide = computed(() => width.value <= 1024);
 

</script>
