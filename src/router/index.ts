import { createRouter, createWebHistory } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { STORAGE_KEY } from '@/types/storage'

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
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

router.beforeEach((to) => {
  const account = useLocalStorage(STORAGE_KEY.ACCOUNT, null)
  if (!account.value && to.path === '/main') {
    return '/login'
  }
})

export default router
