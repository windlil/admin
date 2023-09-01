import useAxios from '..'

/*
  请求用户列表
*/
export function useUsersListRequest<T>(querInfo: any) {
  return useAxios.post<T>({
    url: '/users/list',
    data: querInfo,
  })
}
