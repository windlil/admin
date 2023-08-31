export const localRoutes = [
  {
    path: 'analysis/dashboard',
    component: () => import('../../pages/analysis/dashboard/dashboard.vue'),
    name: 'dashboard',
  },
  {
    path: 'analysis/overview',
    component: () => import('../../pages/analysis/overview/overview.vue'),
    name: 'overview',
  },
  {
    path: 'system/user',
    component: () => import('../../pages/system/user/user.vue'),
    name: 'user',
  },
  {
    path: 'system/role',
    component: () => import('../../pages/system/role/role.vue'),
    name: 'role',
  },
  {
    path: 'system/department',
    component: () => import('../../pages/system/department/department.vue'),
    name: 'department',
  },
  {
    path: 'system/menu',
    component: () => import('../../pages/system/menu/menu.vue'),
    name: 'menu',
  },
  {
    path: 'product/category',
    component: () => import('../../pages/product/category/category.vue'),
    name: 'category',
  },
  {
    path: 'product/goods',
    component: () => import('../../pages/product/goods/goods.vue'),
    name: 'goods',
  },
  {
    path: 'story/chat',
    component: () => import('../../pages/story/chat/chat.vue'),
    name: 'chat',
  },
  {
    path: 'story/list',
    component: () => import('../../pages/story/list/list.vue'),
    name: 'list',
  },
]
