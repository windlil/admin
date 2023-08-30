import useAxios from '..'
import type { IAccount } from '@/types/login'

export function useLoginRequest<T>(account: IAccount) {
  return useAxios.post<T>({
    url: '/login',
    data: account,
  })
}

export function useUserInfoRequest<T>(id: number) {
  return useAxios.get<T>({
    url: `/users/${id}`,
  })
}

export function useUserMenuRequest<T>(id: number) {
  return useAxios.get<T>({
    url: `/role/${id}/menu`,
  })
}
