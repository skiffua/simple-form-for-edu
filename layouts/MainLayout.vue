<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NButton, NSpace } from 'naive-ui'

const router = useRouter()

function goHome() {
  router.push('/security')
}
</script>

<template>
  <div style="min-height: 100vh; position: relative;">
    <router-view />
    <n-button
        style="position: fixed; bottom: 20px; left: 20px; z-index: 1000;"
        type="primary" @click="goHome">
      На головну
    </n-button>
  </div>
</template>
