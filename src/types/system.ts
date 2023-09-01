export interface userListResponse {
  code: number
  data: {
    list: UserList
    totalCount: number
  }
}

export interface UserList {
  cellphone: number
  createAt: string
  departmentId: number
  enable: number
  id: number
  name: string
  realname: string
  roleId: number
  updateAt: string
}

export interface IState {
  userlist: UserList | null
  totalCount: number
}
