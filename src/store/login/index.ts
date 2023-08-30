import { defineStore } from 'pinia'
import { getUserInfo, getUserMenu, setRememberPassword } from '../hooks/login'
import { useLoginRequest } from '@/service/modules/login'
import { IForm, ILoginState } from '@/types/login'
import router from '@/router'
import { getStorage, setStorage } from '@/utils/useStorage'
import { STORAGE_KEY } from '@/types/storage'

export const useLoginStore = defineStore('loginStore', {
  state: (): ILoginState => ({
    token: getStorage(STORAGE_KEY.ACCOUNT)?.token ?? '',
    name: getStorage(STORAGE_KEY.ACCOUNT)?.name ?? '',
    id: getStorage(STORAGE_KEY.ACCOUNT)?.id ?? '',
    userinfo: getStorage(STORAGE_KEY.USERINFO) ?? '',
    usermenu: getStorage(STORAGE_KEY.USERMENU) ?? '',
  }),
  actions: {
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

        getUserInfo(this.userinfo, Number(this.id))

        getUserMenu(this.usermenu, Number(this.id))

        router.push('/main')
      }
    },
  },
})
