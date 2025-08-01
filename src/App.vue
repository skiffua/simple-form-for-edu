<template>
  <n-config-provider>
    <n-message-provider>
      <MyForm />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import MyForm from './components/MyForm.vue'
</script>
