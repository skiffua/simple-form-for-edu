<template>
  <n-message-provider>
    <div class="form-wrapper">
      <n-form
          :model="form"
          ref="formRef"
          label-placement="top"
          style="max-width: 500px; width: 100%"
      >
        <n-form-item label="Ім’я" path="name">
          <n-input v-model:value="form.name" placeholder="Ім’я" />
        </n-form-item>

        <n-form-item label="Прізвище" path="last_name">
          <n-input v-model:value="form.last_name" placeholder="Прізвище" />
        </n-form-item>

        <n-form-item label="Телефон" path="phone">
          <n-input
              v-model:value="formattedPhone"
              placeholder="+38 (067) 123-45-67"
              maxlength="19"
              @input="onPhoneInput"
          />
        </n-form-item>

        <n-form-item label="Номер картки" path="card">
          <n-input
              v-model:value="formattedCard"
              placeholder="2135-2365-4545-4545"
              maxlength="19"
              @input="onCardInput"
          />
        </n-form-item>

        <n-form-item>
          <n-button type="primary" @click="handleSubmit">Відправити</n-button>
        </n-form-item>
      </n-form>
    </div>

    <UserTable :refreshFlag="refreshFlag" />
  </n-message-provider>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useMessage, NForm, NFormItem, NInput, NButton, NMessageProvider } from 'naive-ui';

import UserTable from './UserTable.vue';

interface Form {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  card: string;
}

const message = useMessage()

const form = ref<Form>({
  id: '',
  name: '',
  last_name: '',
  email: '',
  phone: '',
  card: ''
})

const formattedPhone = ref('')
const formattedCard = ref('')
const refreshFlag = ref(0)

function onPhoneInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 12)
  let formatted = '+'
  if (digits.length > 0) formatted += digits.slice(0, 2)
  if (digits.length >= 3) formatted += ' (' + digits.slice(2, 5)
  if (digits.length >= 6) formatted += ') ' + digits.slice(5, 8)
  if (digits.length >= 9) formatted += '-' + digits.slice(8, 10)
  if (digits.length >= 11) formatted += '-' + digits.slice(10, 12)
  formattedPhone.value = formatted
  form.value.phone = digits
}

function onCardInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  const parts = digits.match(/.{1,4}/g) || []
  formattedCard.value = parts.join('-')
  form.value.card = digits
}

async function handleSubmit() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      throw new Error('Не вдалося створити користувача')
    }

    message.success('Користувача створено успішно!')
    console.log('Дані:', form.value)

    form.value = {
      id: '',
      name: '',
      last_name: '',
      phone: '',
      card: '',
      email: '',
    }

    formattedPhone.value = '';
    formattedCard.value = '';

    refreshFlag.value++
  } catch (err) {
    message.error('Помилка при створенні користувача')
    console.error(err)
  }
}
</script>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}
</style>

