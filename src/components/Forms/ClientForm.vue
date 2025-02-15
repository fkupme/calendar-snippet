<template>
  <div class="wrapper">
    <!-- Отображение карточки клиента -->
    <ClientCard
      v-if="selectedClient && !newClient"
      :client="selectedClient"
      @edit="enableAutocomplete"
      class="mb-4"
    />

    <v-autocomplete
      v-if="!newClient && !selectedClient?.id"
      v-model="selectedClient"
      :label="'Клиент'"
      :items="clients"
      :loading="loading"
      :custom-filter="customFilter"
      variant="solo"
      density="default"
      class="mb-4 input-hover-focus"
      hide-details
      autocomplete="off"
      item-title="title"
      item-value="id"
      return-object
      @update:search="fetchClients"
    >
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
      v-if="newClient"
      @success="handleClientCreated"
      @cancel="newClient = false"
    />

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
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

const enableAutocomplete = () => {
  emit("update:modelValue", null);
};

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
  try {
    const fetched = await store.dispatch("calendar/fetchClients", {
      search,
      searchFields: ["name", "phone", "email"],
    });
    return fetched;
  } catch (error) {
    console.log(error);
  }
}
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

onBeforeMount(() => {
  fetchClients("");
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;

.wrapper {
  width: 100%;
}

.client-card {
  padding: f.toVH(12px, 1023px) f.toVW(16px, 1023px);
  border-radius: 8px;

  .v-avatar {
    flex-shrink: 0;
  }

  .v-card-text {
    padding: f.toVH(12px, 1023px) f.toVW(16px, 1023px);
  }

  .client-top {
    gap: f.toVW(8px, 1023px);
  }

  .client-bottom {
    gap: f.toVW(16px, 1023px);
  }
}

.create-client-btn {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: f.toVH(12px, 1023px) f.toVW(16px, 1023px);

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .v-icon {
    margin-right: f.toVW(8px, 1023px);
    color: rgba(0, 0, 0, 0.6);
  }
}

:deep(.v-select__content) {
  .v-list {
    padding: 0;

    &::-webkit-scrollbar {
      width: f.toVW(6px, 1023px);
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: f.toVW(3px, 1023px);
    }

    .v-list-item {
      padding: f.toVH(12px, 1023px) f.toVW(16px, 1023px);
      min-height: auto;

      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }

      .text-subtitle-1 {
        font-weight: 500;
        margin-bottom: f.toVH(4px, 1023px);
      }

      .text-caption {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>