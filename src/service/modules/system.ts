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

export function useDeleteUserRequest<T>(id: number) {
  return useAxios.delete<T>({
    url: `/users/${id}`,
  })
}

export function useDepartmentList<T>() {
  return useAxios.post<T>({
    url: '/department/list',
    data: {
      offset: 0,
      size: 100,
    },
  })
}

export function useRoleList<T>() {
  return useAxios.post<T>({
    url: '/role/list',
  })
}

export function useUserRequest<T>(userinfo: any) {
  return useAxios.post<T>({
    url: '/users',
    data: userinfo,
  })
}

export function useEditUserRequest<T>(id: number, data: any) {
  return useAxios.patch<T>({
    url: `users/${id}`,
    data,
  })
}

export function usePageTableList<T>(type: string, queryInfo?: any) {
  return useAxios.post<T>({
    url: `/${type}/list`,
    data: queryInfo,
  })
}

export function useDeletePageRequest<T>(type: string, id: number) {
  return useAxios.delete<T>({
    url: `/${type}/${id}`,
  })
}

export function useNewPageData<T>(type: string, data: any) {
  return useAxios.post<T>({
    url: `/${type}`,
    data,
  })
}

export function UseeditPageData<T>(type: string, id: number, data: any) {
  return useAxios.patch<T>({
    url: `${type}/${id}`,
    data,
  })
}

export function useEntireMenuList<T>() {
  return useAxios.post<T>({
    url: '/menu/list',
  })
}
