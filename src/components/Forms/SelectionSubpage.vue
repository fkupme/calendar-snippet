<template>
  <div>
    <v-btn
      v-if="!selectedItems.length"
      block
      variant="flat"
      class="d-inline-flex justify-space-between bgc-field mb-4 text-secondary enter-button"
      @click="isOpen = true"
    >
      <div>Добавить {{ addButtonText }}</div>
      <template v-slot:append>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-btn>

    <!-- Если есть выбранные элементы - показываем заголовок и список -->
    <div v-else class="item-list mb-2 pa-2 border">
      <div class="d-flex justify-space-between align-center mb-2 bgc-secondary">
        <span class="fs-14">{{ title }}</span>
        <span class="fs-14 font-weight-medium"
          >{{ totalPrice }}₽
          <v-btn variant="flat" size="small" @click="isOpen = true">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn></span
        >
      </div>

      <!-- Список выбранных элементов с счетчиками -->
      <SelectedItem
        v-for="item in selectedItems"
        :key="item.id"
        :item="item"
        :itemCount="getItemCount(item)"
        :maxLimit="item.inStock"
        @increase="increaseQuantity(item)"
        @decrease="decreaseQuantity(item)"
      />
    </div>

    <!-- Drawer для выбора элементов -->
    <v-navigation-drawer
      v-model="isOpen"
      location="right"
      temporary
      :order="2"
      :width="drawerWidth"
      style="top: 0; height: 100%"
    >
      <div class="drawer-wrapper bgc-primary">
        <div class="drawer-content bgc-secondary">
          <v-toolbar flat class="px-4">
            <v-btn
              variant="text"
              icon="mdi-arrow-left"
              @click="isOpen = false"
            />
            <v-toolbar-title>Добавить {{ addButtonText }}</v-toolbar-title>
          </v-toolbar>

          <!-- Поиск -->
          <div class="px-4 py-2">
            <v-text-field
              v-model="searchQuery"
              placeholder="Найти"
              prepend-inner-icon="mdi-magnify"
              variant="solo"
              density="comfortable"
              hide-details
              class="bg-grey-lighten-4"
            />
          </div>

          <!-- Список категорий и элементов -->
          <v-list>
            <template v-for="category in filteredItems" :key="category.name">
              <v-list-subheader>{{ category.name }}</v-list-subheader>
              <v-list-item
                v-for="item in category.items"
                :key="item.id"
                class="item-row"
              >
                <div class="d-flex align-center justify-space-between w-100">
                  <div
                    class="d-flex align-center"
                    @click.stop="showDetails(item)"
                  >
                    <v-img
                      :src="item.image"
                      width="40"
                      height="40"
                      class="rounded mr-3"
                    />
                    <div>
                      <div class="text-subtitle-2">{{ item.name }}</div>
                      <div class="text-caption text-grey">
                        В наличии {{ item.inStock }}
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-center">
                    <span class="mr-4">{{ item.price }}₽</span>
                    <div class="d-flex align-center">
                      <v-btn
                        icon="mdi-minus"
                        variant="text"
                        density="comfortable"
                        @click="decrementCount(item)"
                        :disabled="!getItemCount(item)"
                      />
                      <span class="mx-2">{{ getItemCount(item) }}</span>
                      <v-btn
                        icon="mdi-plus"
                        variant="text"
                        density="comfortable"
                        @click="incrementCount(item)"
                        :disabled="isMaxLimitReached(item)"
                      />
                    </div>
                  </div>
                </div>
              </v-list-item>
            </template>
          </v-list>

          <!-- Футер с кнопками -->
          <v-card flat class="pa-4 d-flex ga-2">
            <v-btn
              block
              class="action-button"
              variant="text"
              @click="isOpen = false"
              >Назад</v-btn
            >
            <v-btn
              block
              class="action-button"
              color="black"
              @click="addSelected"
              >Добавить</v-btn
            >
          </v-card>
        </div>
      </div>
    </v-navigation-drawer>

    <SubPageItemDetails
      :drawerWidth="drawerWidth"
      v-model="showDetailsDrawer"
      :item="selectedEquipment"
    />
  </div>
</template>
<script setup>
import { computed, onErrorCaptured, ref } from "vue";
import SubPageItemDetails from "./SubPageItemDetails.vue";
import SelectedItem from "./SelectedItem.vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "Оборудование",
  },
  addButtonText: {
    type: String,
    default: "оборудование",
  },
  drawerWidth: {
    type: Number,
    default: 400,
  },
  maxLimit: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const showDetailsDrawer = ref(false);
const selectedEquipment = ref(null);
const searchQuery = ref("");
const selectedTemp = ref([]);

// Группировка элементов по категориям и фильтрация по поиску
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const groupedItems = {};

  props.items.forEach((item) => {
    if (!query || item.name.toLowerCase().includes(query)) {
      if (!groupedItems[item.category]) {
        groupedItems[item.category] = {
          name: item.category,
          items: [],
        };
      }
      groupedItems[item.category].items.push(item);
    }
  });

  return Object.values(groupedItems);
});

const selectedItems = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// дописать вотчер для выбранных элементов и обновления стора

const totalPrice = computed(() => {
  const total = selectedItems.value.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  switch (props.addButtonText) {
    case "услуги":
      store.dispatch("form/updateTotalByServices", total);
      break;

    case "оборудование":
      store.dispatch("form/updateTotalByEquipment", total);

      break;

    default:
      break;
  }
  return total;
});

// Обработчики
const showDetails = (item) => {
  selectedEquipment.value = item;
  showDetailsDrawer.value = true;
};
const increaseQuantity = (item) => {
  const items = [...selectedItems.value];
  const index = items.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    items[index] = { ...items[index], quantity: items[index].quantity + 1 };
    emit("update:modelValue", items);
  }
};

const decreaseQuantity = (item) => {
  const items = [...selectedItems.value];
  const index = items.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    if (items[index].quantity === 1) {
      items.splice(index, 1);
    } else {
      items[index] = { ...items[index], quantity: items[index].quantity - 1 };
    }
    emit("update:modelValue", items);
  }
};

const addSelected = () => {
  const newItems = selectedItems.value.slice();
  const itemsToAdd = props.items
    .filter((item) => selectedTemp.value.includes(item.id))
    .map((item) => ({
      ...item,
      quantity: 1,
    }));

  itemsToAdd.forEach((newItem) => {
    const existingIndex = newItems.findIndex((item) => item.id === newItem.id);
    if (existingIndex === -1) {
      newItems.push(newItem);
    }
  });

  emit("update:modelValue", newItems);
  isOpen.value = false;
  selectedTemp.value = [];
};

const getItemCount = (item) => {
  const selectedItem = selectedItems.value.find((i) => i.id === item.id);
  return selectedItem ? selectedItem.quantity : 0;
};

const incrementCount = (item) => {
  const existingItem = selectedItems.value.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    selectedItems.value.push({ ...item, quantity: 1 });
  }
};

const decrementCount = (item) => {
  const index = selectedItems.value.findIndex((i) => i.id === item.id);

  if (index !== -1) {
    selectedItems.value[index].quantity--;

    if (selectedItems.value[index].quantity === 0) {
      selectedItems.value.splice(index, 1);
    }
  }
};

const removeItem = (index) => {
  selectedItems.value.splice(index, 1);
};

const isMaxLimitReached = (item) => {
  const currentCount = getItemCount(item);
  return currentCount >= item.inStock;
};
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}

.drawer-content {
  width: clamp(400px, 50%, 600px);
  margin-inline: auto;
  max-height: 90vh;
  overflow-y: auto;
  
  @media (max-width: 1023px) {
    width: clamp(400px, 50%, 600px);
    margin-inline: auto;
  }
}

@media (max-width: 1023px){
   :deep(.drawer-content){
    width: clamp(400px, 50%, 600px);
    margin-inline: auto;
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

.item-list {
  border-radius: 20px;
}

.item-row {
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}

.action-button {
  min-width: unset;
}
</style>
