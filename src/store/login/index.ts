import { defineStore } from 'pinia'
import { getUserInfo, getUserMenu, mapRouter, mapMenuToPermission, setRememberPassword } from '../hooks/login'
import { localRoutes } from '@/router/main/localRoutes'
import { useLoginRequest } from '@/service/modules/login'
import { IForm, ILoginState } from '@/types/login'
import router from '@/router'
import { getStorage, setStorage } from '@/utils/useStorage'
import { STORAGE_KEY } from '@/types/storage'

export const useLoginStore = defineStore('loginStore', {
  state: (): ILoginState => ({
    token: '',
    name: '',
    id: '',
    userinfo: '',
    usermenu: '',
    permission: [],
  }),
  actions: {

    // 处理登录逻辑
    async fetchLogin(form: IForm) {
      const res = await useLoginRequest<any>({
        name: form.username,
        password: form.password,
      })
      if (res.data.token) {
        this.id = res.data.id
        this.name = res.data.name
        this.token = res.data.token
        setStorage(STORAGE_KEY.ACCOUNT, {
          token: this.token,
          name: this.name,
          id: this.id,
        })

        // 设置是否隐藏密码
        setRememberPassword(form)

        this.userinfo = await getUserInfo(Number(this.id))

        this.usermenu = await getUserMenu(Number(this.id)) ?? []

        this.permission = mapMenuToPermission(this.usermenu)

        setStorage(STORAGE_KEY.PERMISSION, this.permission)
        // 匹配动态路由
        const firstMenuPath = mapRouter(this.usermenu, localRoutes)

        setStorage(STORAGE_KEY.FIRST_MENU, firstMenuPath)

        router.push(firstMenuPath)
      }
    },

    async getLocalData() {
      const token = getStorage(STORAGE_KEY.ACCOUNT)?.token
      const name = getStorage(STORAGE_KEY.ACCOUNT)?.name
      const id = getStorage(STORAGE_KEY.ACCOUNT)?.id
      const userinfo = getStorage(STORAGE_KEY.USERINFO)
      const usermenu = getStorage(STORAGE_KEY.USERMENU)
      const permission = getStorage(STORAGE_KEY.PERMISSION)

      if (token && name && id && userinfo && usermenu) {
        this.token = token
        this.name = name
        this.id = id
        this.userinfo = userinfo
        this.usermenu = usermenu
        this.permission = permission
        mapRouter(this.usermenu, localRoutes)
      }
    },
  },
})
