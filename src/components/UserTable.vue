<template>
  <n-card title="Створені тестові користувачі">
    <n-data-table
        :columns="columns"
        :data="users"
        :loading="loading"
        :pagination="false"
        striped
        bordered
    />
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted, h, defineProps, watch } from 'vue'
import { NButton, useMessage } from 'naive-ui'

const props = defineProps({
  refreshFlag: {
    type: Number,
    default: 0
  }
})

const users = ref([])
const loading = ref(true)
const message = useMessage()

const fetchUsers = async () => {
  try {
    loading.value = true
    const res = await fetch(import.meta.env.VITE_API_URL + '/users')
    users.value = await res.json()
  } catch (err) {
    message.error('Не вдалося завантажити користувачів')
  } finally {
    loading.value = false
  }
}

const deleteUser = async (id: number) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) throw new Error()

    message.success('Користувача видалено')
    await fetchUsers()
  } catch {
    message.error('Помилка при видаленні користувача')
  }
}

watch(() => props.refreshFlag, () => {
  fetchUsers()
})

const columns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: 'Імʼя',
    key: 'name'
  },
  {
    title: 'Прізвище',
    key: 'last_name'
  },
  {
    title: 'Телефон',
    key: 'phone'
  },
  {
    title: 'Картка',
    key: 'card'
  },
  {
    title: 'Email',
    key: 'email'
  },
  {
    title: 'Дії',
    key: 'actions',
    render(row: any) {
      return h(
          NButton,
          {
            type: 'error',
            size: 'small',
            onClick: () => deleteUser(row.id)
          },
          { default: () => 'Видалити' }
      )
    }
  }
]

onMounted(fetchUsers)
</script>