import { ref, onMounted, onUnmounted } from "vue";

export function useDeviceWidth() {
  const width = ref(window.innerWidth);

  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener("resize", updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
  });

  const isMobile = () => width.value < 768; // Пример порогового значения
  const isTablet = () => width.value >= 768 && width.value < 1024;
  const isDesktop = () => width.value >= 1024;

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
  };
}