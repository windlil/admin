import { defineStore } from 'pinia'
import { useUsersListRequest } from '@/service/modules/system'
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
      console.log(this.userlist)
    },
  },
})

export default useSystemStore
