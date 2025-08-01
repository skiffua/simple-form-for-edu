import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const routes = [
    {
        path: '/',
        name: 'DefaultLayout',
        component: DefaultLayout,
        children: []
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
