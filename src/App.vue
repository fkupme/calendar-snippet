<template>
  <v-app>
    <HeaderPanel/>
    <v-main>
      <MainLayout />
    </v-main>

  </v-app>
</template>

<script setup>
  import MainLayout from '@/components/MainLayout.vue'
  import HeaderPanel from '@/components/HeaderPanel.vue'
</script>
