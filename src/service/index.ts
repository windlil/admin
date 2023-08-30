import Request from './request'
import { BASE_URL } from './request/config'
import { STORAGE_KEY } from '@/types/storage'
import { getStorage } from '@/utils/useStorage'

const useAxios = new Request({
  baseURL: BASE_URL,
  interceptors: {
    requestInterceptor(config): any {
      const account = getStorage(STORAGE_KEY.ACCOUNT)
      if (account && config.headers) {
        config.headers.Authorization = `Bearer ${account.token}`
      }
      return config
    },
  },
})

export default useAxios
