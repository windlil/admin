import { setStorage } from '@/utils/useStorage'
import { useUserInfoRequest, useUserMenuRequest } from '@/service/modules/login'
import { STORAGE_KEY } from '@/types/storage'
import type { IForm } from '@/types/login'
import router from '@/router'

export function setRememberPassword(form: IForm) {
  if (form.checked) {
    setStorage(STORAGE_KEY.USER, {
      username: form.username,
      password: form.password,
    })
  } else {
    setStorage(STORAGE_KEY.USER, {
      username: '',
      password: '',
    })
  }
}

export async function getUserInfo(id: number) {
  const userinfo = await useUserInfoRequest<any>(id)
  const info = userinfo.data ?? null
  setStorage(STORAGE_KEY.USERINFO, info)
  return info
}

export async function getUserMenu(id: number) {
  const usermenu = await useUserMenuRequest<any>(id)
  const menu = usermenu.data ?? null
  setStorage(STORAGE_KEY.USERMENU, menu)
  return menu
}

function MenuToArray(menu: any) {
  const arr: any[] = []

  for (const item of menu) {
    if (item.children) {
      for (const children_item of item.children) {
        arr.push({
          url: children_item.url,
        })
      }
    }
  }

  return arr
}

export function mapRouter(menu: any, routes: any) {
  let firstMenu = null
  const menuArr = MenuToArray(menu)
  const result = []
  for (const menu_item of menuArr) {
    for (const router_item of routes) {
      if (menu_item.url.includes(router_item.path)) {
        result.push(router_item)
        router.addRoute('main', router_item)
        if (!firstMenu) {
          firstMenu = router_item.path
        }
      }
    }
  }
  return `/main/${firstMenu}`
}
