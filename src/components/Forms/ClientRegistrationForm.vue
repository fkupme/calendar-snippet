<template>
  <v-form @submit.prevent="handleSubmit" class="create-client-form">
    <div class="form-title mb-4">Создание клиента</div>
    
    <v-text-field
      v-model="formData.name"
      label="Имя"
      variant="outlined"
      density="comfortable"
      :error-messages="errors.name"
      @input="errors.name = ''"
			class="custom-field"
    />


    <v-text-field
      v-model="formData.surname"
      label="Фамилия"
      variant="outlined"
      density="comfortable"
    />

    <v-text-field
      v-model="formData.phone"
      label="Телефон*"
      variant="outlined"
      density="comfortable"
      :error-messages="errors.phone"
      @input="errors.phone = ''"
      v-maska="'+7 (###) ###-##-##'"
			class="custom-field"
    />


    <v-text-field
      v-model="formData.email"
      label="Email"
      variant="outlined"
      density="comfortable"
      :error-messages="errors.email"
      @input="errors.email = ''"
    />

    <div class="d-flex justify-end mt-4">
      <v-btn
        variant="text"
        class="mr-2"
        @click="$emit('cancel')"
      >
        Отменить
      </v-btn>
      <v-btn
        color="primary"
        type="submit"
        :loading="loading"
				@click.prevent="handleSubmit"
      >
        Создать
      </v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { vMaska } from 'maska/vue'
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(['cancel', 'success', 'created']);

const loading = ref(false);
const formData = reactive({
  name: '',
  surname: '',
  phone: '',
  email: ''
});

const errors = reactive({
  name: '',
  phone: '',
  email: ''
});

const validateForm = () => {
  let isValid = true;
  
  if (!formData.name.trim()) {
    errors.name = 'Имя обязательно';
    isValid = false;
  }
  
  if (!formData.phone.trim()) {
    errors.phone = 'Телефон обязателен';
    isValid = false;
  }
  
  if (formData.email && !formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errors.email = 'Неверный формат email';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  loading.value = true;
  try {
    const newClient = {
      id: Date.now(),
      name: formData.name.trim(),
      surname: formData.surname.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      status: 'new',
      closed: 0,
      messages: 0,
      fee: 0
    };

    await store.dispatch('calendar/pushClient', newClient);
    emit('success', newClient);
  } catch (error) {
    console.error('Error creating client:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.create-client-form {
  padding: 16px;
  
  .form-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
  }
  
  :deep(.v-field) {
    margin-bottom: 16px;
    
  }
	.custom-field {
  :deep(.v-input__details) {
    padding-top: 2px;
    min-height: 20px;
  }

  :deep(.v-messages) {
    min-height: 20px;
    padding-top: 2px;
  }

  :deep(.v-text-field__details) {
    margin-bottom: 8px;
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }
}
}
</style>