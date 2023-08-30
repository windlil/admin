import useAxios from '..'
import type { IAccount } from '@/types/login'

export function useLoginRequest<T>(account: IAccount) {
  return useAxios.post<T>({
    url: '/login',
    data: account,
  })
}
