<template>
  <v-app>
    <HeaderPanel />
    <MainLayout />
  </v-app>
</template>

<script setup>
  import MainLayout from '@/components/MainLayout'
  import HeaderPanel from '@/components/HeaderPanel'
  import { useStore } from 'vuex';
import {  onBeforeMount } from 'vue'
  const store = useStore();
  onBeforeMount(() => {
    store.dispatch('calendar/getCashedCalendarState');

  });
</script>
