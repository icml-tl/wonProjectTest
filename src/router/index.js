import { createRouter, createWebHistory } from 'vue-router'

// Using PascalCase for component names
import dashboard from '@/views/dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: dashboard,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // base URL setup for Vite
  routes,
})

export default router
