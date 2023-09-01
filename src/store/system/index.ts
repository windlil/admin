import { defineStore } from 'pinia'
import { useDeleteUserRequest, useEditUserRequest, useUserRequest, useUsersListRequest } from '@/service/modules/system'
import type { IState, userListResponse } from '@/types/system'

const useSystemStore = defineStore('systemStore', {
  state: (): IState => ({
    userlist: null,
    totalCount: 0,
  }),

  actions: {
    async getUsersList(queryInfo: any) {
      const data = await useUsersListRequest<userListResponse>(queryInfo)

      const { list, totalCount } = data.data
      this.userlist = list
      this.totalCount = totalCount
    },

    async deleteUser(id: number) {
      const data = await useDeleteUserRequest<any>(id)
      console.log(data)
      return new Promise((resolve, reject) => {
        if (data.code === 0) {
          resolve(true)
        } else {
          reject(new Error(data.data))
        }
      })
    },

    async addUser(userinfo: any) {
      const data = await useUserRequest<any>(userinfo)
      console.log(data)
      return new Promise((resolve, reject) => {
        if (data.code === 0) {
          resolve(true)
        } else {
          reject(new Error(data.data))
        }
      })
    },

    async editUser(id: number, userinfo: any) {
      const data = await useEditUserRequest<any>(id, userinfo)
      return new Promise((resolve, reject) => {
        if (data.code === 0) {
          resolve(true)
        } else {
          reject(new Error(data.data))
        }
      })
    },
  },
})

export default useSystemStore
