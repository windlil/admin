export interface IForm {
  username: string
  password: string
  checked: boolean
}

export interface IAccount {
  name: string
  password: string
}

export interface ILoginState {
  token: string
  id: string
  name: string
  userinfo: any
  usermenu: any
}
