import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequstInterceptors<T>
}

export interface RequstInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => InternalAxiosRequestConfig // 请求拦截器
  requestInterceptorCatch?: (error: any) => any // 请求失败拦截器
  responseInterceptor?: (res: T) => T // 响应成功拦截器
  responseInterceptorCatch?: (error: any) => any // 响应失败拦截器
}
