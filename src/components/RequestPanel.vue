<template>
  <div class="request-panel" v-bind="$attrs">
    <v-card class="request-panel__card card">
      <div class="request-panel__top d-flex flex-nowrap justify-space-between">
        <CustomButtonsPanel
          :values="{
            new: 'Новая',
            inProgress: 'В работе',
            processed: 'Обработано',
          }"
          :font='"12"'
          @update:selectedView="handleFilterChange"
          v-model:selectedView="filterParameter"
        />
        <v-btn
          flat
          icon="mdi-arrow-top-right"
          class="request-panel__arrow-button"

        />
      </div>
      <v-list class="request-panel__list">
        <template v-for="(dayGroup, date) in groupedRequests" :key="date">
          <div class="request-panel__date-header fs-12 text-secondary align-baseline font-weight-medium">
            Заявка на {{ formatDate(date) }}
          </div>
          <v-card
            v-for="request in dayGroup"
            :key="request.id"
            variant="flat"
            class="request-panel__card-item card"
          >
            <v-card-text class="request-panel__card-content border">
              <div class="d-flex justify-space-between align-left">
                <div>
                  <div class="fs-14 font-weight-medium">
                    {{ getClientName(request.client_id) }}
                  </div>
                  <div class="fs-9 no-wrap">{{ request.studio }}</div>
                  <div class="fs-12 font-weight-medium">{{ request.category }}</div>
                  <div class="fs-12 mt-2">{{ request.price }}₽</div>
                </div>
                <div class="text-right d-flex flex-column justify-space-between">
                  <div class="fs-12">{{ request.time }}</div>
                  <div class="d-flex ga-2 mt-4">
                    <v-btn
                      variant="outlined"
                      color="primary"
                      class="request-panel__action-button flex-1-1-0 font-weight-medium fs-10 btn-secondary"
                      size="small"
                      @click="declineRequest(request.id)"
                      :disabled="request.status === 'processed'"
                    >
                      Отклонить
                    </v-btn>
                    <v-btn
                      variant="flat"
                      color="primary"
                      class="request-panel__action-button btn-primary flex-1-1-0 font-weight-medium fs-10"
                      size="small"
                      @click="acceptRequest(request.id, 'inProgress')"
                      :disabled="request.status === 'processed'"
                    >
                      В работу
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-text class="request-panel__card-caption fs-9 text-secondary">
              Заявка будет автоматически отклонена
              {{ formatExpirationDate(request.expirationDate) }}
            </v-card-text>
          </v-card>
        </template>
      </v-list>
    </v-card>
  </div>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import CustomButtonsPanel from "./UI/CustomButtonsPanel.vue";
import { useDateFormat } from "@vueuse/core";

const store = useStore();
const filterParameter = ref("new");

const filteredRequests = computed(() => {
  return store.getters["edit/filteredRequests"];
});

const groupedRequests = computed(() => {
  return filteredRequests.value.reduce((acc, request) => {
    if (!acc[request.date]) {
      acc[request.date] = [];
    }
    acc[request.date].push(request);
    return acc;
  }, {});
});

const formatDate = (date) => {
  const dateObj = new Date(date);
  return useDateFormat(dateObj, "ddd, DD MMMM");
};

const formatExpirationDate = (date) => {
  const dateObj = new Date(date);
  return useDateFormat(dateObj, "DD.MM в HH:mm");
};

const handleFilterChange = (filter) => {
  filterParameter.value = filter;
  store.dispatch("edit/setFilter", filter);
};

const getClientName = (clientId) => {
  return store.getters["calendar/getClientById"](clientId);
};

const snackbar = ref({
  show: false,
  text: "",
  color: "success",
});

const acceptRequest = (requestId, status) => {
  store.dispatch("edit/processRequest", { requestId, status });
  snackbar.value = {
    show: true,
    text: "Заявка в работе",
    color: "success",
  };
};

const declineRequest = (requestId) => {
  store.dispatch("edit/declineRequest", requestId);
  snackbar.value = {
    show: true,
    text: "Заявка отклонена",
    color: "grey-darken-1",
  };
};

defineOptions({
  inheritAttrs: false
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;

.request-panel {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 16px;

  &__card {
    margin: 0 auto;
    background: #ffffff;
    border-radius: 20px;
    padding: 12px 12px 38px; 
    margin-bottom: 16px;
    
    @media (max-width: 1023px) {
      padding: f.toVH(12px, 1023px) f.toVW(12px, 1023px);
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    @media (max-width: 1023px) {
      gap: f.toVW(8px, 1023px);
    }
  }

  &__arrow-button {
    height: 100%;
    aspect-ratio: 1 / 1;
    background-color: white;
    border: 1px solid #ccc;
    color: black;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &__list {
    overflow-y: auto;
    height: 270px;

    &::-webkit-scrollbar {
      width: 6px; 
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 3px;
    }
  }

  &__date-header {
    padding: 4px 10px; 

    @media (max-width: 1023px) {
      padding: f.toVH(4px, 1023px) f.toVW(10px, 1023px);
    }
  }

  &__card-item {
    border-radius: 10px;
    margin-bottom: 8px;

    @media (max-width: 1023px) {
      margin-bottom: f.toVH(8px, 1023px);
    }
  }

  &__card-content {
    padding: 8px 7px 12px 7px; 

    @media (max-width: 1023px) {
      padding: f.toVH(8px, 1023px) f.toVW(7px, 1023px) f.toVH(12px, 1023px) f.toVW(7px, 1023px);
    }
  }

  &__card-caption {
    padding: 4px 0 0 52px;
    text-align: left;

    @media (max-width: 1023px) {
      padding: f.toVH(4px, 1023px) f.toVW(10px, 1023px);
    }
  }

  &__action-button {
    padding: 4px 8px;
    min-width: auto;

    @media (max-width: 1023px) {
      padding: f.toVH(4px, 1023px) f.toVW(8px, 1023px);
    }
  }
}

.v-btn--icon.v-btn--density-default {
  width: auto;
  height: 100%;
}
</style>