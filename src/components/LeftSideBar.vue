<template>
  <v-navigation-drawer
    :width='180'
    style="bottom: auto; top: auto; height: auto; "
    v-model="drawer"
    elevation="3"
    :rail="rail"
    permanent
    absolute
  >
    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="item.action"
      >
        <template v-slot:prepend>
          <v-img :src="item.icon" icon alt="icon" class="icon"></v-img>
        </template>
        <v-list-item-title v-if="!rail">{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-list-item class="d-flex" :class='"justify-end"?? rail' :slim='true' @click="toggleRail">
        <v-icon>{{ rail ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { shallowRef } from "vue";
import { useStore } from "vuex";

const store = useStore();


const drawer = shallowRef(true);
const rail = shallowRef(true);

const styledFunction = (arg, styles) => {
  if (arg) return styles;
};

const toggleRail = () => {
  rail.value = !rail.value;
};

const items = [
  {
    title: "Пользователи",
    icon: new URL("@/assets/icons/sidebar-profile.svg", import.meta.url).href,
    action: () => console.log("Users"),
  },
  {
    title: "Создать задачу",
    icon: new URL("@/assets/icons/sidebar-content.svg", import.meta.url).href,
    action: () => store.dispatch('form/toggleForm'),
  },
  {
    title: "Календарь",
    icon: new URL("@/assets/icons/sidebar-calendar.svg", import.meta.url).href,
    action: () => console.log("Calendar"),
  },
  {
    title: "Настройки",
    icon: new URL("@/assets/icons/sidebar-report.svg", import.meta.url).href,
    action: () => console.log("Settings"),
  },
  {
    title: "FAQ",
    icon: new URL("@/assets/icons/sidebar-faq.svg", import.meta.url).href,
    action: () => console.log("FAQ"),
  },
];
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  width: 150px;
  border-radius: 0 10px 10px 0;
  &--rail {
    width: 64px;
  }
}

.icon {
  width: 24px;
  height: 24px;
}

.v-list {
  &-item {
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover {
      background-color: #e0e0e0;
    }
  }
}
</style>