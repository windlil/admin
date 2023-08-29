import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../pages/main/main.vue'),
    name: 'main',
  },
  {
    path: '/login',
    component: () => import('../pages/login/login.vue'),
    name: 'login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
