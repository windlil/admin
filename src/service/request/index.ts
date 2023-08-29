import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig, RequstInterceptors } from './type'

class Request {
  instance: AxiosInstance
  interceptors: RequstInterceptors

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors as RequstInterceptors

    this.useInterceptors()
  }

  // use interceptors
  useInterceptors() {
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    )
  }

  // basic request
  request<T>(config: RequestConfig<T>): Promise<T> {
    if (config?.interceptors?.requestInterceptor)
      config = config.interceptors.requestInterceptor(config)
    return new Promise((resolve, reject) => {
      this.instance.request<any, T>(config).then((res: any) => {
        if (config.interceptors?.responseInterceptor)
          res = config.interceptors.responseInterceptor(res)

        resolve(res)
      }).catch((err) => {
        return reject(err)
      })
    })
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  POST<T>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default Request
