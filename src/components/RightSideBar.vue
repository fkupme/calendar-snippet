<template>
  <v-card>
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab key="new">Новая</v-tab>
      <v-tab key="in-progress">В работе</v-tab>
      <v-tab key="processed">Обработано</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="new">
        <OrderList :orders="newOrders" />
      </v-tab-item>
      <v-tab-item key="in-progress">
        <OrderList :orders="inProgressOrders" />
      </v-tab-item>
      <v-tab-item key="processed">
        <OrderList :orders="processedOrders" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import OrderList from "./OrderList.vue";

const tab = ref(null);
const newOrders = [];
const inProgressOrders = [];
const processedOrders = [];
</script>
