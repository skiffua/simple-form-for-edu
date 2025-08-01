<template>
  <n-message-provider>
    <div class="form-wrapper">
      <n-form
          :model="form"
          ref="formRef"
          label-placement="top"
          style="max-width: 500px; width: 100%"
      >
        <n-form-item label="Ім’я" path="firstName">
          <n-input v-model:value="form.firstName" placeholder="Ім’я" />
        </n-form-item>

        <n-form-item label="Прізвище" path="lastName">
          <n-input v-model:value="form.lastName" placeholder="Прізвище" />
        </n-form-item>

        <n-form-item label="Телефон" path="phone">
          <n-input
              v-model:value="formattedPhone"
              placeholder="+38 (067) 123-45-67"
              maxlength="19"
              @input="onPhoneInput"
          />
        </n-form-item>

        <n-form-item label="Номер картки" path="cardNumber">
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
  </n-message-provider>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useMessage, NForm, NFormItem, NInput, NButton, NMessageProvider } from 'naive-ui'

const message = useMessage()

const form = ref({
  firstName: '',
  lastName: '',
  phone: '',
  cardNumber: ''
})

const formattedPhone = ref('')
const formattedCard = ref('')

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
  form.value.cardNumber = digits
}

function handleSubmit() {
  message.success(`Форма надіслана!`)
  console.log('Дані:', form.value)
}
</script>

<style scoped>
.form-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}
</style>

