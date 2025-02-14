<template>
  <v-card class="client-card mb-4" elevation="2">
    <v-card-text class="d-flex flex-column align-center justify-space-between w-100">
      <div class="d-flex align-center">
        <v-avatar
          :text="client.name"
          size="40"
          color="grey-lighten-3"
          class="mr-3"
        >
          <v-img
            :src="
              client.avatar ||
              'https://cdn.vuetifyjs.com/images/lists/4.jpg'
            "
          />
        </v-avatar>
        <div>
          <div class="d-flex justify-space-between align-center">
            <span class="text-subtitle-1 font-weight-medium">{{
              client.name
            }}</span>
            <span
              class="text-caption ml-2 text-primary"
              v-if="client.rating"
              >{{ client.rating }}</span
            >
          </div>
          <div class="d-flex align-center text-caption">
            <div class="d-flex align-center">
              <a
                class="text-decoration-none no-wrap text-grey"
                :href="`tel:${client.phone}`"
              >
                <v-icon>mdi-phone</v-icon> {{ client.phone }}
              </a>
            </div>
            <span class="mx-2">•</span>
            <div class="d-flex align-center" v-if="client.email">
              <a
                class="text-decoration-none no-wrap text-grey"
                :href="`mailto:${client.email}`"
              >
                <v-icon>mdi-email</v-icon> {{ client.email }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column align-center text-caption mt-2">
        <div class="client-top d-flex">
          <span class="color-primary no-wrap" v-if="client.closed"
            >Завершенные заказы: {{ client.closed }}</span
          >
          <span class="color-primary no-wrap" v-if="client.messages"
            >Сообщений по клиенту: {{ client.messages }}</span
          >
        </div>
        <div
          class="client-bottom align-baseline d-flex justify-space-between flex-grow-1 mt-2"
        >
          <span
            class="color-primary no-wrap fs-16 font-weight-medium"
            v-if="client.fee"
            >Сбор: {{ client.fee }}₽</span
          >
          <v-btn
            @click="editClient"
            key="edit"
            variant="text"
            color="secondary"
            class="fs-9"
            >Изменить клиента <v-icon>mdi-pencil-outline</v-icon></v-btn
          >
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit"]);

const editClient = () => {
  emit("edit");
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;

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
</style>