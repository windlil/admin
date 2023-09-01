import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig, RequstInterceptors } from './type'

/*
  使用ts对axios进行了二次封装，使其有更良好的类型提示，可以灵活的增加实例或全局拦截器。
*/

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

        resolve(res.data)
      }).catch((err) => {
        return reject(err)
      })
    })
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
