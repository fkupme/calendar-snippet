<template>
  <div class="wrapper">
    <v-btn
      v-if="isPanelHiddenByWidth && !isPanelOpen"
      icon="mdi-arrow-bottom-left"
      color="primary"
      density="compact"
      height="32"
      width="32"
      @click="isPanelOpen = true"
    />
    <transition name='move-right-top'>
      <div class="content" v-if="isPanelOpen || !isPanelHiddenByWidth">
        <v-card class="requests-panel pa-4">
          <div class="request-panel-top d-flex flex-nowrap justify-space-between">
            <CustomButtonsPanel
              :values="{
                new: 'Новая',
                inProgress: 'В работе',
                processed: 'Обработано',
              }"
              @update:selectedView="handleFilterChange"
              v-model:selectedView="filterParameter"
              :isMediumScreen="isMediumScreen"
            />
            <v-btn
              icon="mdi-arrow-top-right"
              color="primary"
              density="compact"
              height="32"
              width="32"
              @click="isPanelOpen = false"
            />
          </div>
          <v-list class="mt-4 request-list">
            <template v-for="(dayGroup, date) in groupedRequests" :key="date">
              <v-list-subheader class="date-header text-subtitle-2">
                Заявка на {{ formatDate(date) }}
              </v-list-subheader>
              <v-card
                v-for="request in dayGroup"
                :key="request.id"
                class="mb-4"
                variant="flat"
              >
                <v-card-text class="request-card border pa-4">
                  <div class="d-flex justify-space-between align-left">
                    <div>
                      <div class="fs-12">{{ request.name }}</div>
                      <div class="fs-14">{{ request.studio }}</div>
                      <div class="fs-10">{{ request.category }}</div>
                      <div class="fs-12 mt-2">{{ request.price }}₽</div>
                    </div>
                    <div
                      class="text-right d-flex flex-column justify-space-between"
                    >
                      <div class="fs-12">{{ request.time }}</div>
                      <div class="d-flex ga-2 mt-4">
                        <v-btn
                          variant="outlined"
                          color="primary"
                          class="flex-1-1-0 font-weight-medium fs-10"
                          size="small"
                          @click="declineRequest(request.id)"
                          :disabled="request.status === 'processed'"
                        >
                          <v-icon v-if="isMediumScreen" size="20px"
                            >mdi-close</v-icon
                          >
                          <span v-else>Отклонить</span>
                        </v-btn>
                        <v-btn
                          color="primary"
                          class="flex-1-1-0 font-weight-medium fs-10"
                          size="small"
                          @click="acceptRequest(request.id, 'inProgress')"
                          :disabled="request.status === 'processed'"
                        >
                          <v-icon v-if="isMediumScreen" size="20px"
                            >mdi-arrow-right</v-icon
                          >
                          <span v-else>В работу</span>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-card-text>
                <v-card-text class="pa-4 pt-0 text-caption text-grey">
                  Заявка будет автоматически отклонена
                  {{ formatExpirationDate(request.expirationDate) }}
                </v-card-text>
              </v-card>
            </template>
          </v-list>
        </v-card>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import CustomButtonsPanel from "./UI/CustomButtonsPanel.vue";
import { useDateFormat, useWindowSize } from "@vueuse/core";



const { width } = useWindowSize();
const isPanelHiddenByWidth = computed(() => width.value <= 1000);
const isMediumScreen = computed(() => width.value > 768 && width.value <= 1200);
const isPanelOpen = ref(false);


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

const acceptRequest = (requestId, status) => {
  store.dispatch("edit/processRequest", { requestId, status });
};

const declineRequest = (requestId) => {
  store.dispatch("edit/declineRequest", requestId);
};

</script>

<style lang="scss" scoped>
.wrapper {
  @media (max-width: 1000px) {
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 1000;
  }
}
.move-right-top-enter-from {
    transform: translate(100px, -100px);
    opacity: 0;
  }

  .move-right-top-enter-active {
    transition: all 0.3s ease-out;
  }

  .move-right-top-enter-to {
    transform: translate(0, 0);
    opacity: 1;
  }

  .move-right-top-leave-from {
    transform: translate(0, 0);
    opacity: 1;
  }

  .move-right-top-leave-active {
    transition: all 0.3s ease-in;
  }

  .move-right-top-leave-to {
    transform: translate(100px, -100px);
    opacity: 0;
  }

.content {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  
}
.requests-panel {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
}

.request-list {
  max-height: 45vh;
  overflow-y: auto;

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

.request-card {
  border-radius: 10px;
}


</style>
