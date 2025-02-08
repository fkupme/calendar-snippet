<template>
  <v-list>
    <v-list-item v-for="order in orders" :key="order.id">
      <v-list-item-content>
        <v-list-item-title>{{ order.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ order.time }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn @click="acceptOrder(order)">В работу</v-btn>
        <v-btn @click="declineOrder(order)">Отклонить</v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script setup>
defineProps({
  orders: {
    type: Array,
    required: true,
  },
});

function acceptOrder(order) {
  // Принять заказ в работу
}

function declineOrder(order) {
  // Отклонить заказ
}
</script>