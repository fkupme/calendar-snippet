<template>
  <LeftSidebar class="left-sidebar" />
  <div class="grid-container">
    <NewOrderForm />
    <CalendarView class="calendar" />
    <RequestPanel class="request-panel" />
  </div>
</template>

<script setup>
import LeftSidebar from "@/components/LeftSideBar";
import CalendarView from "@/components/calendar/CalendarView";
import RequestPanel from "@/components/RequestPanel";
import NewOrderForm from "@/components/forms/NewOrderForm";

</script>

<style lang="scss" scoped>
@use "@/assets/styles/utils" as *;
@use '@/assets/styles/functions' as f;
 
.calendar {
  grid-column: 1;
  grid-row: 1 / span 2;
  grid-row: 1 / span 2;
  height: f.toVH(740px);
}
.left-sidebar {
  position: absolute;
}
:deep(.request-panel) {
  grid-column: 2;
  grid-row: 1;
  height: f.toVH(360px);
}
@media (max-width: 1024px) {
  .calendar{
    grid-column: 1 / span 4;
    grid-row: 1;
    height: auto;
  }
  :deep(.request-panel){
    grid-column: 1;
    grid-row: 2;
    height: auto;
  }
}
</style>
