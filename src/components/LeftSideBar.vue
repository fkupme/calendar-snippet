<template>
  <div class="custom-sidebar" :class="{ 'is-tablet': isTablet }">
    <!-- Кнопка активации для планшетов -->
    <button v-if="isTablet" class="toggle-button" @click="toggleDrawer">
      <v-icon>{{ drawer ? "mdi-chevron-down" : "mdi-chevron-up" }}</v-icon>
    </button>

    <!-- Основное содержимое боковой панели -->
    <div
      ref="target"
      v-show="!isTablet || drawer"
      class="sidebar-content"
      :class="{ open: drawer }"
    >
      <div
        v-for="item in items"
        :key="item.title"
        class="sidebar-item"
        @click="item.action"
      >
        <v-img :src="item.icon" alt="icon" class="icon"></v-img>
        <span v-if="!rail && !isTablet">{{ item.title }}</span>
      </div>
      <div class="toggle-rail" @click="toggleRail" v-if="!isTablet">
        <v-icon>{{ rail ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, computed, onMounted, onUpdated, ref } from "vue";
import { useStore } from "vuex";
import { useWindowSize, onClickOutside } from "@vueuse/core";

const store = useStore();

const target = ref(null);
const drawer = shallowRef(false);
const rail = shallowRef(true);
const { width } = useWindowSize();
const isTablet = computed(() => width.value < 1024);

const toggleRail = () => {
  rail.value = !rail.value;
};

onClickOutside(target, () => {
  drawer.value = false;
});

const toggleDrawer = () => {
  drawer.value = !drawer.value;
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
    action: () => store.dispatch("form/toggleForm"),
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
@use "@/assets/styles/functions" as f;

.custom-sidebar {
  position: absolute;
  top: 80px;
  z-index: 1000;

  &.is-tablet {
    .sidebar-content {
      position: fixed;
      bottom: -100%;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      max-width: f.toVW(400px);
      background-color: white;
      border-radius: 20px 20px 0 0;
      transition: bottom 0.3s ease-out;
      padding: f.toVH(8px) f.toVW(16px, 1023px);
      flex-direction: row;

      &.open {
        bottom: 0;
        transition: bottom 0.3s ease-in;
      }
    }
  }

  .toggle-button {
    position: fixed;
    bottom: f.toVH(16px);
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: f.toVW(48px);
    height: f.toVW(48px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .sidebar-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: f.toVH(8px);
    background-color: white;
    border-radius: 10px;
    padding: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .sidebar-item {
      display: flex;
      align-items: center;
      gap: f.toVW(8px);
      padding: f.toVH(8px) f.toVW(16px);
      border-radius: f.toVW(8px);
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: #e0e0e0;
      }

      span {
        font-size: f.toVW(14px);
        color: #333;
      }
    }

    .toggle-rail {
      display: flex;
      justify-content: flex-end;
      padding: f.toVH(8px) f.toVW(16px);
      cursor: pointer;
    }
  }

  .icon {
    width: f.toVW(24px);
    @media (max-width: 1023px) {
      width: f.toVW(20px, 1023px);
    }
  }
}
</style>
