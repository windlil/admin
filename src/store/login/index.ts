import { defineStore } from 'pinia'
import { getUserInfo, getUserMenu, mapRouter, setRememberPassword } from '../hooks/login'
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
  }),
  actions: {

    // 处理登录逻辑
    async fetchLogin(form: IForm) {
      const res = await useLoginRequest<any>({
        name: form.username,
        password: form.password,
      })
      if (res.data.data.token) {
        this.id = res.data.data.id
        this.name = res.data.data.name
        this.token = res.data.data.token
        setStorage(STORAGE_KEY.ACCOUNT, {
          token: this.token,
          name: this.name,
          id: this.id,
        })

        // 设置是否隐藏密码
        setRememberPassword(form)

        this.userinfo = await getUserInfo(Number(this.id))

        this.usermenu = await getUserMenu(Number(this.id)) ?? []

        // 匹配动态路由
        const firstMenuPath = mapRouter(this.usermenu, localRoutes)
        router.push(firstMenuPath)
      }
    },

    async getLocalData() {
      const token = getStorage(STORAGE_KEY.ACCOUNT)?.token
      const name = getStorage(STORAGE_KEY.ACCOUNT)?.name
      const id = getStorage(STORAGE_KEY.ACCOUNT)?.id
      const userinfo = getStorage(STORAGE_KEY.USERINFO)
      const usermenu = getStorage(STORAGE_KEY.USERMENU)

      if (token && name && id && userinfo && usermenu) {
        this.token = token
        this.name = name
        this.id = id
        this.userinfo = userinfo
        this.usermenu = usermenu
        mapRouter(this.usermenu, localRoutes)
      }
    },
  },
})
