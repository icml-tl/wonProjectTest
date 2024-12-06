import { createRouter, createWebHistory } from 'vue-router'

import dashboard from '@/views/dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: dashboard,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/')
  } else {
    next()
  }
})

export default router
