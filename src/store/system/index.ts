import { defineStore } from 'pinia'
import {
  UseeditPageData,
  useDeletePageRequest,
  useDeleteUserRequest,
  useEditUserRequest,
  useNewPageData,
  usePageTableList,
  useUserRequest,
  useUsersListRequest,
} from '@/service/modules/system'
import type { IState, userListResponse } from '@/types/system'

const useSystemStore = defineStore('systemStore', {
  state: (): IState => ({
    userlist: null,
    totalCount: 0,
    pageList: null,
    pageTotalCount: 0,
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

    async getPageList(type: string, queryInfo?: any) {
      const data = await usePageTableList<any>(type, queryInfo)
      this.pageList = data.data.list
      this.pageTotalCount = data.data.totalCount
    },

    async delPageById(type: string, id: number) {
      const data = await useDeletePageRequest(type, id)
      return data
    },

    async newPageData(type: string, info: any) {
      const data = await useNewPageData(type, info)
      return data
    },

    async editPageData(type: string, id: number, info: any) {
      const data = await UseeditPageData(type, id, info)
      return data
    },
  },
})

export default useSystemStore
