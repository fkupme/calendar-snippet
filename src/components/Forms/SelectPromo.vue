<template>
  <div>
    <!-- Кнопка для открытия drawer с промокодами -->
    <v-btn
      block
      variant="flat"
      class="mb-4 color-grey-lighten-1 bg-grey-lighten-4"
      @click="isOpen = true"
    >
      Выбрать промокод
      <v-icon end>mdi-chevron-right</v-icon>
    </v-btn>

    <!-- Отображение выбранного промокода -->
    <div v-if="selectedPromo" class="mb-4">
      <div class="d-flex justify-space-between align-center mb-2">
        <span class="text-subtitle-1">Выбранный промокод:</span>
        <span class="text-subtitle-1">{{ selectedPromo.promo }}</span>
        <v-btn variant="flat" size="small" @click="clearSelectedPromo">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="pa-2 d-flex align-center justify-space-between bg-grey-lighten-4 rounded">
        <div>
          <div class="text-subtitle-2">{{ selectedPromo.description }}</div>
          <div class="text-caption text-grey">
            Скидка: {{ selectedPromo.time }} | Позиция: {{ selectedPromo.pos }}
          </div>
        </div>
      </div>
    </div>

    <!-- Drawer для выбора промокодов -->
    <v-navigation-drawer v-model="isOpen" location="right" temporary width="400">
      <v-toolbar flat class="px-4">
        <v-btn variant="text" icon="mdi-arrow-left" @click="isOpen = false" />
        <v-toolbar-title>Выберите промокод</v-toolbar-title>
      </v-toolbar>

      <!-- Поиск -->
      <div class="px-4 py-2">
        <v-text-field
          v-model="searchQuery"
          placeholder="Найти промокод"
          prepend-inner-icon="mdi-magnify"
          variant="solo"
          density="comfortable"
          hide-details
          class="bg-grey-lighten-4"
        />
      </div>
      
      <!-- СДЕЛАТЬ РАДИО ГРУППУ-->
      <v-list>
        <v-list-item
          v-for="promo in filteredPromos"
          :key="promo.promo"
          class="item-row"
          @click="selectPromo(promo)"
        >
          <div class="d-flex align-center justify-space-between w-100">
            <div class="d-flex align-center">
              <div>
                <div class="text-subtitle-2">{{ promo.promo }}</div>
                <div class="text-caption text-grey">{{ promo.description }}</div>
              </div>
            </div>
            <div class="d-flex align-center">
              <span class="mr-4">{{ promo.time }}</span>
            </div>
          </div>
        </v-list-item>
        <!-- Добавить кнопку "Применить" в шаблон -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  promos: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const searchQuery = ref("");
const selectedPromo = ref(null);

const filteredPromos = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return props.promos.filter((promo) =>
    promo.promo.toLowerCase().includes(query) ||
    promo.description.toLowerCase().includes(query)
  );
});

const selectPromo = (promo) => {
  selectedPromo.value = promo;
  isOpen.value = false;
  emit("update:modelValue", promo);
};


const clearSelectedPromo = () => {
  selectedPromo.value = null;
  emit("update:modelValue", null);
};
</script>


<style lang="scss" scoped>
.item-row {
  cursor: pointer;
}
.item-row:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>