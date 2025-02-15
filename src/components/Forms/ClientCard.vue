<template>
  <v-card class="client-card" elevation="2">
    <v-card-text class="client-card__content">
      <div class="client-card__header d-flex align-center">
        <div class="client-card__avatar-container mr-3">
          <v-avatar
            :text="client.name"
            color="grey-lighten-3"
            :class="{ 'client-card__avatar--pro': client.status === 'pro' }"
            class="client-card__avatar"
          >
            <v-img
              :src="
                client.avatar || 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
              "
            />
            <CustomBadge
              v-if="client.status === 'pro'"
              :content="getStatus(client.status)"
              gradient
              class="client-card__badge"
            />
          </v-avatar>
        </div>
        <!-- Информация о клиенте -->
        <div class="client-card__info flex-grow-1">
          <div
            class="client-card__name d-flex justify-space-between align-center"
          >
            <div
              class="client-card__name-title fs-16 font-weight-medium d-flex align-center ga-1"
            >
              <v-icon tag="div" class="fs-16" color="secondary"
                >mdi-alert-outline</v-icon
              >
              {{ client.name }}
            </div>
            <div
              class="client-card__points fs-14 d-flex font-weight-medium background-gradient"
              v-if="client.points"
            >
              {{ client.points }}
              <img
                src="@/assets/icons/points.svg"
                alt="Points icon"
                class="client-card__points-icon"
              />
            </div>
          </div>
          <div
            class="client-card__contacts d-flex justify-space-between align-center fs-12"
          >
            <div class="client-card__phone d-flex align-center">
              <a
                class="client-card__link text-decoration-none no-wrap text-grey"
                :href="`tel:${client.phone}`"
              >
                <v-icon>mdi-phone</v-icon> {{ client.phone }}
              </a>
            </div>
            <div
              class="client-card__email d-flex align-center"
              v-if="client.email"
            >
              <a
                class="client-card__link text-decoration-none no-wrap text-grey"
                :href="`mailto:${client.email}`"
              >
                <v-icon>mdi-email</v-icon> {{ client.email }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Дополнительная информация -->
      <div
        class="client-card__details d-flex flex-column align-center text-caption mt-2"
      >
        <div class="client-card__stats d-flex justify-content-between">
          <span
            class="client-card__stat color-primary no-wrap"
            v-if="client.closed"
            >Завершенные заказы: {{ client.closed }}</span
          >
          <span
            class="client-card__stat color-primary no-wrap"
            v-if="client.messages"
            >Сообщений по клиенту: {{ client.messages }}</span
          >
        </div>
        <div
          class="client-card__actions d-flex justify-content-between flex-grow-1 mt-2"
        >
          <span
            class="client-card__fee color-primary no-wrap fs-16 font-weight-medium"
            v-if="client.fee"
            >Сбор: {{ client.fee }}₽</span
          >
          <v-btn
            @click="editClient"
            key="edit"
            variant="text"
            color="secondary"
            class="client-card__edit-btn fs-12"
            >Изменить клиента <v-icon>mdi-pencil-outline</v-icon></v-btn
          >
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import CustomBadge from "@/components/UI/CustomBage";

const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
});

const getStatus = (status) => {
  switch (status) {
    case "pro":
      return "Pro";
    case "new":
      return "New";
    default:
      return "Неизвестный статус";
  }
};

const emit = defineEmits(["edit"]);

const editClient = () => {
  emit("edit");
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;

$background-gradient: linear-gradient(
  247.64deg,
  rgb(255, 50, 50),
  rgb(229, 138, 174),
  rgb(179, 141, 255),
  rgb(43, 77, 236),
  rgb(130, 150, 244),
  rgb(56, 202, 112)
);

.client-card {
  padding: f.toVH(12px, 1023px) f.toVW(16px, 1023px);
  border-radius: 8px;
  width: 100%;
  &__content{
    padding: 0;
    margin-left: auto;
  }

  &__edit-btn {
    padding: 0;
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__avatar-container {
    position: relative;
  }

  &__avatar {
    flex-shrink: 0;
    border-radius: 50%;
    position: relative;
    overflow: visible;
    :deep(.v-img__img--cover) {
      object-fit: cover;
      border-radius: 50%;
    }

    &--pro {
      position: relative;
      z-index: 1;

      &::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 50%;
        background: $background-gradient;
        z-index: -1;
        pointer-events: none;
      }
    }
  }

  &__badge {
    position: absolute;
    bottom: -4px;
    z-index: 9999;
  }

  &__info {
    flex-grow: 1;
  }

  &__name {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__name-title {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__points {
    display: flex;
    align-items: center;
    gap: 4px;
    background: $background-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -text-fill-color: transparent;
  }

  &__points-icon {
    margin-left: 4px;
  }

  &__contacts {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__phone,
  &__email {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__link {
    text-decoration: none;
    color: #666;

    &:hover {
      color: #333;
    }
  }

  &__details {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: f.toVH(8px, 1023px);
  }

  &__stats {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: f.toVW(8px, 1023px);
  }

  &__actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: f.toVH(8px, 1023px);
  }
}
</style>