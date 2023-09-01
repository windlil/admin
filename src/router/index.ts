import { createRouter, createWebHistory } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { STORAGE_KEY } from '@/types/storage'

/*
  动态路由
  基于向后端接口请求返回的菜单信息，根据菜单信息来匹配正确的路由，
  然后通过router.add()方法来动态的创建路由。
*/

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
  const firstMenu = useLocalStorage(STORAGE_KEY.FIRST_MENU, '/')
  console.log(firstMenu.value)
  if (!account.value && to.path === '/main') {
    return '/login'
  } else if (to.path === '/main') {
    return JSON.parse(firstMenu.value)
  }
})

export default router
