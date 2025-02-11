<template>
  <div class="wrapper">
    <v-autocomplete
      v-if="!newClient"
      :model-value="selectedClient"
      @update:model-value="selectedClient = $event"
      :label="!selectedClient ? 'Клиент' : ''"
      :items="clients"
      :loading="loading"
      :custom-filter="customFilter"
      variant="solo"
      density="default"
      class="mb-4"
      hide-details
      autocomplete="off"
      item-title="title"
      item-value="id"
      return-object
      @update:search="fetchClients"
      :readonly='!!selectedClient'
    >
      <template #selection="{ item }">
        <div
          v-if="item"
          class="d-flex flex-column align-center justify-space-between w-100"
        >
          <div class="d-flex align-center">
            <v-avatar
              :text="item.raw.name"
              size="40"
              color="grey-lighten-3"
              class="mr-3"
            >
              <v-img
                :src="
                  item.raw?.avatar ||
                  'https://cdn.vuetifyjs.com/images/lists/4.jpg'
                "
              />
            </v-avatar>
            <div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-subtitle-1 font-weight-medium">{{
                  item.raw.name
                }}</span>
                <span
                  class="text-caption ml-2 text-primary"
                  v-if="item.raw.rating"
                  >{{ item.raw.rating }}</span
                >
              </div>
              <div class="d-flex align-center text-caption">
                <div class="d-flex align-center">
                  <a class="text-decoration-none no-wrap text-grey" :href="`tel:${item.raw.phone}`">
										<v-icon>mdi-phone</v-icon> {{ item.raw.phone }}
									</a>
                </div>


                <span class="mx-2">•</span>
                <div class="d-flex align-center" v-if="item.raw.email">
                  <a class="text-decoration-none no-wrap text-grey" :href="`mailto:${item.raw.email}`">
										<v-icon>mdi-email</v-icon> {{ item.raw.email }}
									</a>

                </div>
              </div>
            </div>

          </div>
          <div class="d-flex flex-column  align-center text-caption">
            <div class="client-top d-flex">
              <span class="color-primary no-wrap" v-if="item.raw.closed"
                >Завершенные заказы: {{ item.raw.closed }}</span
              >
              <span class="color-primary no-wrap" v-if="item.raw.messages"
                >Сообщений по клиенту: {{ item.raw.messages }}</span
              >
            </div>
            <div class="client-bottom align-baseline d-flex justify-space-between flex-grow-1">
              <span class="color-primary no-wrap fs-16 font-weight-medium" v-if="item.raw.fee"
                >Сбор: {{ item.raw.fee }}₽</span
              >
              <v-btn @click="enableAutocomplete" key="edit" variant="text" color="secondary" class="fs-9"
                >Изменить клиента <v-icon>mdi-pencil-outline</v-icon></v-btn
              >
            </div>
          </div>
        </div>
      </template>

      <template #item="{ item, props: itemProps }">
        <v-list-item v-bind="itemProps">
          <template #title>
            <div class="text-subtitle-1">{{ item.title }}</div>
          </template>
          <template #subtitle>
            <div class="d-flex flex-column text-caption">
              <span>{{ item.raw.raw.phone }}</span>
              <span class="text-grey">{{ item.raw.raw.email }}</span>
            </div>
          </template>
        </v-list-item>
      </template>

      <template #append-item>
        <v-list-item class="create-client-btn" @click="createClient">
          <template #prepend>
            <v-icon>mdi-plus</v-icon>
          </template>
          <template #title>
            <span>Создать клиента</span>
          </template>
        </v-list-item>
      </template>
    </v-autocomplete>
    <ClientRegistrationForm
      v-else
      @success="handleClientCreated"
      @cancel="newClient = false"
    />
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import ClientRegistrationForm from "./ClientRegistrationForm";

const store = useStore();
const loading = ref(false);
const newClient = ref(false);

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const createClient = () => {
  newClient.value = true;
};

const enableAutocomplete = ()=>{
  emit("update:modelValue", null);
}

const clients = computed(() => {
  return store.getters["calendar/getFilteredClients"].map((client) => ({
    id: client.id,
    title: client.name,
    raw: client,
  }));
});
const selectedClient = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value?.raw || null),
});
const customFilter = () => true;

const fetchClients = async (search) => {
  if (!search) return;
  let fetched = null;
  try {
    fetched = await store.dispatch("calendar/fetchClients", {
      search,
      searchFields: ["name", "phone", "email"],
    });
  } catch (error) {
    console.log(error);
  }
};
const snackbar = ref({
  show: false,
  text: "",
  color: "success",
});

const handleClientCreated = (client) => {
  emit("update:modelValue", client);
  snackbar.value = {
    show: true,

    text: "Клиент успешно создан",
    color: "success",
  };

  newClient.value = false;
};

onMounted(() => {
  fetchClients("");
});
</script>

<style lang="scss" scoped>
:deep(.v-select__content) {
  .v-list {
    padding: 0;
  }
  .custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.3) transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 3px;
    }

    .v-list-item {
      padding: 12px 16px;
      min-height: auto;

      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }

      .text-subtitle-1 {
        font-weight: 500;
        margin-bottom: 4px;
      }

      .text-caption {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}

.create-client-btn {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 12px 16px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .v-icon {
    margin-right: 8px;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>
