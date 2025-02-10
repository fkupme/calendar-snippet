<template>
  <v-app-bar height="60" elevation="3" app>
    <!-- Левый логотип с меню -->
    <v-menu offset-y>
      <template v-slot:activator="{ props: menu }">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
              icon
              v-bind="mergeProps(menu, tooltip)"
							variant="elevated"
							elevation="3"
            >
              <img
                src="/images/logo-left.png"
                alt="Левый логотип"
                style="height: 40px"
              />
            </v-btn>
          </template>
          <span>Меню левого логотипа</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Опция 1</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Опция 2</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Пространство между логотипами -->
    <v-spacer></v-spacer>

    <!-- Правый логотип с меню -->
    <v-menu offset-y>
      <template v-slot:activator="{ props: menu }">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
              icon
              v-bind="mergeProps(menu, tooltip)"
							variant="elevated"
							elevation="3"
            >
              <img
                src="/images/logo-right.png"
                alt="Правый логотип"
                style="height: 40px"
              />
            </v-btn>
          </template>
          <span>Меню правого логотипа</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Опция A</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Опция B</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { mergeProps } from 'vue';

</script>

<style scoped>
.logo {
  height: 40px;
}
</style>