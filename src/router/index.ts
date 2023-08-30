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
    children: [
      {
        path: 'analysis/dashboard',
        component: () => import('../pages/analysis/dashboard/dashboard.vue'),
        name: 'dashboard',
      },
      {
        path: 'analysis/overview',
        component: () => import('../pages/analysis/overview/overview.vue'),
        name: 'overview',
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../pages/login/login.vue'),
    name: 'login',
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../pages/NotFound/not-found.vue'),
    name: 'NotFound',
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
