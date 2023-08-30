import { defineStore } from 'pinia'
import { useLoginRequest } from '@/service/modules/login'
import { IForm, ILoginState } from '@/types/login'

export const useLoginStore = defineStore('loginStore', {
  state: (): ILoginState => ({
    token: '',
    name: '',
    id: '',
  }),
  actions: {
    async fetchLogin(form: IForm) {
      const res = await useLoginRequest<any>({
        name: form.username,
        password: form.password,
      })
      this.id = res.data.data.id
      this.name = res.data.data.name
      this.token = res.data.data.token
    },
  },
})
