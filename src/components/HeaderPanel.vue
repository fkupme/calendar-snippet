<template>
  <v-app-bar class="header" elevation="0" app>
    <!-- Левый логотип с меню -->
    <v-menu offset-y>
      <template v-slot:activator="{ props: menu }">
        <v-tooltip location="top">
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
              class="header-btn"
              icon
              v-bind="mergeProps(menu, tooltip)"
              variant="flat"
            >
              <img
                class="header-btn__logo"
                src="/images/logo-left.png"
                alt="Левый логотип"
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
              variant="flat"
              class="header-btn"
            >
              <img
                src="/images/logo-right.png"
                alt="Правый логотип"
                class="header-btn__logo"
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
import { mergeProps } from "vue";


</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;

.header {
  &-btn {
    width: 40px;
    height: auto;
    &__logo {
      width: 40px;
    }
  }
  @media (max-width: 1023px) {
    &__btn {
      width: 40px;
      &__logo {
        width: 40px;
      }
    }
  }
}
</style>
