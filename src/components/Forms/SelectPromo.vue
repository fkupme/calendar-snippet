<template>
  <div>
    <v-btn
      v-if="!selectedPromo"
      block
      variant="flat"
      class="d-inline-flex justify-space-between bgc-field mb-4 text-secondary enter-button"
      @click="isOpen = true"
    >
      Выбрать промокод
      <template v-slot:append>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-btn>

    <div v-else class="promo-item selected-promo w-100">
      <div class="promo-header">
        <span class="fs-12">Промокод:</span>
        <span class="fs-14 font-weight-medium">{{ selectedPromo.promo }}</span>
      </div>

      <div class="promo-main d-flex justify-space-between">
        <div class="d-flex ga-4">
          <div>
            <span class="fs-12">Время</span>
            <div class="fs-14 font-weight-medium">{{ selectedPromo.time }}</div>
          </div>
        </div>
        <div>
          <span class="fs-12">Позиции</span>
          <div class="fs-14 font-weight-medium">{{ selectedPromo.pos }}</div>
        </div>
        <div class="d-flex align-center">
          <div class="me-2">
            <span class="fs-12">Источник</span>
            <div class="fs-14">{{ selectedPromo.source }}</div>
          </div>
          <v-btn variant="flat" size="small" @click="isOpen = true">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <v-navigation-drawer
      v-model="isOpen"
      location="right"
      temporary
      :order="2"
      :width="drawerWidth"
      style="top: 0; height: 100%; bottom: 0"
    >
      <div class="drawer-wrapper bgc-primary">
        <div class="drawer-content bgc-secondary">
          <v-toolbar flat class="px-4">
            <v-btn
              variant="text"
              icon="mdi-arrow-left"
              @click="isOpen = false"
            />
            <v-toolbar-title>Выберите промокод</v-toolbar-title>
          </v-toolbar>

          <div class="px-4 py-2">
            <v-text-field
              v-model="searchQuery"
              placeholder="Найти промокод"
              prepend-inner-icon="mdi-magnify"
              variant="solo"
              density="comfortable"
              hide-details
              class="search-field"
            />
          </div>

          <v-list class="px-4">
            <v-list-item
              v-for="promo in filteredPromos"
              :key="promo.promo"
              @click="selectPromo(promo)"
              class="promo-item"
              rounded
              :class="{
                'selected-promo': selectedPromo?.promo === promo.promo,
              }"
            >
              <div class="promo-header mb-2">
                <span class="fs-12 text-secondary">Промокод:</span>
                <span class="fs-14 font-weight-medium">{{ promo.promo }}</span>
              </div>

              <div class="promo-main d-flex justify-space-between mb-2">
                <div class="d-flex ga-4">
                  <div>
                    <span class="fs-12 text-secondary">Время</span>
                    <div class="fs-14 font-weight-medium">{{ promo.time }}</div>
                  </div>
                </div>
                <div>
                  <span class="fs-12 text-secondary">Позиции</span>
                  <div class="fs-14 font-weight-medium">{{ promo.pos }}</div>
                </div>
                <div>
                  <span class="fs-12 text-secondary">Источник</span>
                  <div class="fs-14">{{ promo.source }}</div>
                </div>
              </div>

              <!-- Футер -->
              <div class="promo-footer">
                <span class="fs-12 font-weight-medium text-secondary"
                  >Описание</span
                >
                <div class="fs-12">{{ promo.description }}</div>
              </div>
            </v-list-item>
          </v-list>

          <div class="actions-wrapper">
            <v-card flat class="pa-4 d-flex ga-2">
              <v-btn
                block
                class="action-button"
                variant="text"
                @click="isOpen = false"
              >
                Назад
              </v-btn>
              <v-btn
                block
                class="action-button"
                color="black"
                @click="confirmPromo"
              >
                Применить
              </v-btn>
            </v-card>
          </div>
        </div>
      </div>
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
  drawerWidth: {
    type: Number,
    default: 400,
  },
  modelValue: {
    type: [Object, String],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);
const isOpen = ref(false);
const searchQuery = ref("");
const selectedPromo = ref(
  props.modelValue && typeof props.modelValue === "object"
    ? props.modelValue
    : null
);

const filteredPromos = computed(() => {
  if (!searchQuery.value) return props.promos;

  const query = searchQuery.value.toLowerCase();
  return props.promos.filter(
    (promo) =>
      promo.promo.toLowerCase().includes(query) ||
      promo.description.toLowerCase().includes(query)
  );
});

const selectPromo = (promo) => {
  selectedPromo.value =
    selectedPromo.value?.promo === promo.promo ? null : promo;
};

const confirmPromo = () => {
  emit("update:modelValue", selectedPromo.value);
  isOpen.value = false;
};
</script>

<style lang="scss" scoped>
:deep(.v-list-item__content) {
  width: 100%;
}

.drawer-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

}

.drawer-content {
  width: clamp(400px, 50%, 600px);
  margin-inline: auto;
  height: calc(100dvh - 60px);
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1023px) {
    width: clamp(400px, 50%, 600px);
    margin-inline: auto;
  }
}

:deep(.v-list) {
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
    
    &-track { background: #f1f1f1; }
    &-thumb { 
      background: #888;
      border-radius: 3px;
    }
  }
}

.v-navigation-drawer {
  overflow-x: hidden;
  
  @media (max-width: 1023px) { 
    width: 100% !important; 
    max-width: 100vw;
    z-index: 9999;
  }
}

:deep(.v-navigation-drawer__content) {
  overflow-y: hidden;
}

.search-field {
  border-radius: 12px;
  overflow: hidden;
}

.promo-item {
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-block: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.selected-promo {
  border: 2px solid black !important;
  background-color: rgba(0, 0, 0, 0.05);
}

.promo-header,
.promo-main,
.promo-footer {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.promo-main {
  flex-direction: row;
  align-items: flex-start;
}

.actions-wrapper {
  margin-top: auto;
}

.action-button {
  min-width: unset;
}

.item-list {
  border-radius: 20px;
}

.item-row {
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}
</style>