<template>
  <div class="custom-badge" :style="badgeStyles">
    <span class="custom-badge__content fs-8" :class="{ 'custom-badge__content_gradient': true }">
      {{ content }}
    </span>
  </div>
</template>


<script setup>
import { computed } from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  gradient: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: "#FFFFFF", // Белый фон по умолчанию
  },
});

const badgeStyles = computed(() => ({
  background: props.backgroundColor,
  padding: "4px",
  borderRadius: "4px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
}));
</script>


<style lang="scss" scoped>
.custom-badge {
  font-size: 12px;
  line-height: 1.2;
  font-weight: bold;
  text-transform: uppercase;

  &__content {
    &_gradient {
      background: linear-gradient(
        247.64deg,
        rgb(255, 50, 50),
        rgb(229, 138, 174),
        rgb(179, 141, 255),
        rgb(43, 77, 236),
        rgb(130, 150, 244),
        rgb(56, 202, 112)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      -text-fill-color: transparent;
    }
  }
}
</style>