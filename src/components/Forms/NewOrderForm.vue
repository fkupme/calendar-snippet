<template>
	<v-navigation-drawer v-model="isOpen" location="right" temporary width="400">
		<div class="d-flex justify-space-between align-center pa-4">
			<span class="text-h6">Новый заказ</span>
			<div class="d-flex gap-2">
				<v-btn
					icon="mdi-refresh"
					variant="text"
					@click="clearForm"
					title="Очистить форму"
				/>
				<v-btn icon="mdi-close" variant="text" @click="closeForm" />
			</div>
		</div>

		<v-form class="pa-4" @submit.prevent="submitForm" @keydown.enter.prevent>
			<ClientForm v-model="formData.client" />

			<!-- Дата и время -->
			<div class="d-flex gap-4 mb-4">
				

				<DateField v-model="formData.date" />


				<v-text-field
					v-model="formData.time"
					label="Время"
					type="time"
					variant="solo"
					density="comfortable"
					hide-details
				/>
			</div>

			<!-- Вид работ и количество человек -->
			<div class="d-flex gap-4 mb-4">
				<v-select
					autocomplete="off"
					v-model="formData.workType"
					label="Вид работ"
					:items="workTypes"
					variant="solo"
					density="comfortable"
					class="flex-grow-1"
					hide-details
				/>
				<v-text-field
					autocomplete="off"
					v-model="formData.peopleCount"
					label="Кол-во человек"
					type="number"
					variant="solo"
					density="comfortable"
					style="width: 120px"
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
				class="mb-4"
				hide-details
			/>

			<!-- Оборудование -->
			<v-expansion-panels
				variant="accordion"
				elevation="0"
				class="mb-4"
				color="#F6F7F8"
			>
				<v-expansion-panel>
					<v-expansion-panel-title
						>Добавить оборудование</v-expansion-panel-title
					>
					<v-expansion-panel-text>
						<v-checkbox
							v-for="item in equipment"
							:key="item.id"
							v-model="formData.selectedEquipment"
							:label="item.name"
							:value="item.id"
							hide-details
						/>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>

			<!-- Услуги -->
			<v-expansion-panels
				variant="accordion"
				elevation="0"
				class="mb-4"
				color="#F6F7F8"
			>
				<v-expansion-panel>
					<v-expansion-panel-title>Добавить услугу</v-expansion-panel-title>
					<v-expansion-panel-text>
						<v-checkbox
							v-for="service in services"
							:key="service.id"
							v-model="formData.selectedServices"
							:label="service.name"
							:value="service.id"
							hide-details
						/>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>

			<!-- Комментарий -->
			<v-textarea
				v-model="formData.comment"
				label="Комментарий администратора"
				variant="solo"
				density="comfortable"
				class="mb-4"
				hide-details
				auto-grow
				rows="3"
			/>

			<!-- Промокод -->
			<v-text-field
				v-model="formData.promoCode"
				label="Промокод"
				variant="solo"
				density="comfortable"
				class="mb-4"
				hide-details
			/>

			<!-- Повтор -->
			<v-select
				v-model="formData.repeat"
				label="Повтор"
				:items="repeatOptions"
				variant="solo"
				density="comfortable"
				class="mb-4"
				hide-details
			/>

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
					:class="{ border: formData.color === color }"
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
	</v-navigation-drawer>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useDateFormat } from "@vueuse/core";
import { VDateInput } from 'vuetify/labs/components'

const store = useStore();

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
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
	:deep(.v-navigation-drawer__content) {
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-track {
			background: #f1f1f1;
		}

		&::-webkit-scrollbar-thumb {
			background: #888;
			border-radius: 3px;
		}
	}
	:deep(.v-field) {
		box-shadow: none;
		background: #f6f7f8;

		&.v-field--variant-plain {
			.v-field__outline {
				display: none;
			}
		}
	}
}

.border {
	border: 2px solid currentColor !important;
}
</style>