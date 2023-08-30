import { setStorage } from '@/utils/useStorage'
import { useUserInfoRequest, useUserMenuRequest } from '@/service/modules/login'
import { STORAGE_KEY } from '@/types/storage'
import type { IForm } from '@/types/login'

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

export async function getUserInfo(info: any, id: number) {
  const userinfo = await useUserInfoRequest<any>(id)
  info = userinfo.data.data
  setStorage(STORAGE_KEY.USERINFO, info)
}

export async function getUserMenu(menu: any, id: number) {
  const usermenu = await useUserMenuRequest<any>(id)
  menu = usermenu.data.data
  setStorage(STORAGE_KEY.USERMENU, menu)
}
