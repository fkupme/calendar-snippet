<template>
  <div>
    <v-btn
      v-if="!selectedItems.length"
      block
      variant="flat"
      class=" d-inline-flex justify-space-between mb-4 color-grey-lighten-1 bg-grey-lighten-4 enter-button"
      @click="isOpen = true"
    >
      Добавить {{ addButtonText }}
      <v-icon end>mdi-chevron-right</v-icon>
    </v-btn>

    <!-- Если есть выбранные элементы - показываем заголовок и список -->
    <div v-else class="mb-4">
      <div class="d-flex justify-space-between align-center mb-2">
        <span class="text-subtitle-1">{{ title }}</span>
        <span class="text-subtitle-1">{{ totalPrice }}₽</span>
        <v-btn variant="flat" size="small" @click="isOpen = true">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </div>

      <!-- Список выбранных элементов с счетчиками -->
      <div
        v-for="item in selectedItems"
        :key="item.id"
        class="selected-item pa-2 d-flex align-center justify-space-between bg-grey-lighten-4 rounded mb-2"
      >
        <div class="d-flex align-center">
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
              @click="decreaseQuantity(item)"
            />
            <span class="mx-2">{{ item.quantity }}</span>
            <v-btn
              icon="mdi-plus"
              variant="text"
              density="comfortable"
              @click="increaseQuantity(item)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Drawer для выбора элементов -->
    <v-navigation-drawer
      v-model="isOpen"
      location="right"
      temporary
      :order="2"
      width="400"
    >
      <v-toolbar flat class="px-4">
        <v-btn variant="text" icon="mdi-arrow-left" @click="isOpen = false" />
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
              <div class="d-flex align-center" @click.stop="showDetails(item)">
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
                <v-checkbox
                  v-model="selectedTemp"
                  :value="item.id"
                  hide-details
                  @click.stop
                />
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
        <v-btn block class="action-button" color="black" @click="addSelected"
          >Добавить</v-btn
        >
      </v-card>
    </v-navigation-drawer>

    <SubPageItemDetails v-model="showDetailsDrawer" :item="selectedEquipment" />
  </div>
</template>
<script setup>
import { computed, onErrorCaptured, ref } from "vue";
import SubPageItemDetails from "./SubPageItemDetails.vue";
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
  console.log(total);
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

onErrorCaptured((e) => {
  console.error(e);
});
</script>

<style lang="scss" scoped>
.item-row {
  cursor: pointer;
}

.item-row:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
.action-button {
  min-width: unset;
}
</style>
