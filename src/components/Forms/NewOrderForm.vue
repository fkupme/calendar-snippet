<template>
	<v-navigation-drawer v-model="isOpen" location="right" temporary :width="drawerWidth" app>
		<div class="form-wrapper bgc-primary">
      <div class="form-content bgc-secondary">

        <div class="d-flex justify-space-between align-center pa-4">
          <span class="fs-20 font-weight-medium">Новый заказ</span>
          <div class="d-flex ga-2">
            <v-btn color="#ccc" icon="mdi-close-circle" variant="text" @click="closeForm" />
          </div>
        </div>

        <v-form class="form pa-4 new-order-form" @submit.prevent="submitForm" @keydown.enter.prevent>
          <ClientForm v-model="formData.client" />
          <!-- Дата и время -->
          <div class="date-time d-flex ga-4 mb-4 align-stretch">
            <DateField class="date-time__field flex-1" v-model="formData.date" />
            <CustomTimeInput class="date-time__field flex-1" v-model="formData.time" />
          </div>
          <!-- Вид работ и количество человек -->
          <div class="d-flex ga-4 mb-4 align-stretch work-details">
            <v-select
              v-model="formData.workType"
              label="Вид работ"
              :items="workTypes"
              variant="solo"
              density="comfortable"
              class="work-type input-hover-focus bgc-field fs-16"
              hide-details
            />
            <v-select
              v-model="formData.peopleCount"
              label="Количество человек"
              :items="[1,2,3,4 ]"
              type="number"
              variant="solo"
              density="comfortable"
              class="people-count input-hover-focus bgc-field fs-16"
              hide-details
            />
          </div>
          <!-- Выбор локации -->
          <v-select
            v-model="formData.location"
            label="Выбор площадки"
            :items="locations"
            variant="solo"
            density="comfortable"
            class="mb-4 input-hover-focus bgc-field fs-16"
            hide-details
          />
          <h3 class="mb-4 fs-16 font-weight-medium">Дополнительно</h3>
          <!-- Оборудование -->
          <SelectionSubpage
            v-model="formData.selectedEquipment"
            :items="equipment"
            title="Оборудование"
            addButtonText="оборудование"
            :drawerWidth="drawerWidth"
          />
          <!-- Услуги -->
          <SelectionSubpage
            v-model="formData.selectedServices"
            :items="services"
            title="Услуги"
            addButtonText="услуги"
            :drawerWidth="drawerWidth"
          />
          <!-- Комментарий -->
          <v-textarea
            v-model="formData.comment"
            label="Комментарий администратора"
            variant="solo"
            density="comfortable"
            class="mb-4 input-hover-focus"
            hide-details
            auto-grow
            rows="3"
          />
          <!-- Промокод -->
              <SelectPromo
                v-model="formData.promoCode"
                :promos="promoCodes"
                :drawerWidth="drawerWidth"
              />
          <!-- Повтор -->
          <v-select
            v-model="formData.repeat"
            label="Повтор"
            :items="repeatOptions"
            variant="solo"
            density="comfortable"
            class="mb-4 fs-14 input-hover-focus"
            hide-details
                v-if='formData.repeat === "Не повторять"'
          />
              <div v-else class="d-flex gap-2 mb-6">
                <DateField v-model="formData.repeatStartDate" :start='true' />
                <DateField v-model="formData.repeatEndDate" :end='true' />
              </div>
          <!-- Цветовые метки -->
          <div class="d-flex gap-2 mb-6">
            <v-btn
              v-for="color in colors"
              :key="color"
              :color="color"
              icon="mdi-circle"
              size="small"
              variant="text"
              @click="formData.color = color"
              :class="{ selected: formData.color === color }"
            />
          </div>
          <!-- Итоговая стоимость -->
          <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-body-1">Итоговая стоимость</span>
            <span class="text-h6">{{ totalPrice }}₽</span>
          </div>
          <!-- Кнопка закрытия -->
          <v-btn
            block
            color="black"
            class="text-button"
            type="submit"
            variant="flat"
          >
            Закрыть время
          </v-btn>
        </v-form>
      </div>
    </div>
	</v-navigation-drawer>
</template>

<script setup>
import { computed, onErrorCaptured, } from "vue";
import { useStore } from "vuex";
import { useDateFormat } from "@vueuse/core";
import DateField from "./DateField";
import CustomTimeInput from "../forms/CustomTimeInput";
import SelectionSubpage from "../forms/SelectionSubpage";  
import SelectPromo from "../forms/SelectPromo";
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const store = useStore();

const drawerWidth = computed(() => {
  if (width.value < 1024) {
    return width.value
  } else {
    return '400'
  }
})

// Геттеры для данных формы и состояния

const isOpen = computed({
	get: () => store.getters["form/isOpen"],
	set: (value) => store.commit("form/SET_IS_OPEN", value),
});

const formData = computed({
	get: () => store.getters["form/formData"],
	set: (value) => store.commit("form/SET_FORM_DATA", value),
});
const clients = computed(() => store.getters["calendar/clients"]);
const equipment = computed(() => store.getters["form/equipment"]);
const services = computed(() => store.getters["form/services"]);
const totalPrice = computed(() => store.getters["form/totalPrice"]);

// Форматирование даты
const formattedDate = computed(() => {
	return formData.value.date
		? useDateFormat(formData.value.date, "DD MMMM", { locales: "ru-RU" }).value
		: new Date();
});

const promoCodes = computed(() => store.getters["form/promo"]);

// Константы для селектов
const workTypes = ["Фотосъемка", "Видеосъемка", "Репетиция"];
const locations = ["Traditional", "New School", "Bio", "Trash", "Oriental"];
const repeatOptions = ["Не повторять", "Каждый день", "Каждую неделю"];
const colors = ["primary", "success", "error", "warning", "info"];

// Методы
const closeForm = () => {
	store.commit("form/SET_IS_OPEN", false);
};

const clearForm = () => {
	store.dispatch("form/clearFormData");
};

const submitForm = () => {
	store.commit("form/SET_FORM_DATA", formData.value);
	store.dispatch("form/clearFormData");
	closeForm();
};
onErrorCaptured((err) => {
  console.log(err)
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/functions" as f;
.form-content {
  width: clamp(400px, 50%, 600px);
  margin-inline: auto;
  border-radius: 40px;
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

:deep(.v-field) {
  box-shadow: none;
  background: #F5F4F4;
}

:deep(.v-field--variant-plain .v-field__outline) {
  display: none;
}

.new-order-form {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.work-details {
  .work-type, .people-count {
    flex: 0 0 calc(50% - 8px);
    width: calc(50% - 8px);
    min-width: f.toVW(228px, 1023px);
  }
}

.date-time {
  .date-time__field {
    flex: 0 0 calc(50% - 8px);
    width: calc(50% - 8px);
    min-width: f.toVW(228px, 1023px);
  }
}

.selected {
  transform: scale(1.3);
}

.input-hover-focus {
  transition: all 0.3s ease;
  
  &:hover, &:focus {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>