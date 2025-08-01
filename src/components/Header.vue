<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <n-page-header subtitle="Мережеві технології. Самбір, 'Лідер'. 2025">
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item><RouterLink to="/security">Інформаційні загрози</RouterLink></n-breadcrumb-item>
        <n-breadcrumb-item><RouterLink to="/education">Навчання в Інтернеті</RouterLink></n-breadcrumb-item>
        <n-breadcrumb-item><RouterLink to="/ai">ШІ</RouterLink></n-breadcrumb-item>
        <n-breadcrumb-item><RouterLink to="/">Державні сервіси</RouterLink></n-breadcrumb-item>
      </n-breadcrumb>
    </template>
  </n-page-header>
  <div>
    <RouterView />
  </div>
</template>