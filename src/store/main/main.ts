import { defineStore } from 'pinia'
import { useDepartmentList, useRoleList } from '@/service/modules/system'

const useMainStore = defineStore('mainStore', {
  state: () => ({
    roleList: '',
    departmentList: '',
  }),
  actions: {
    async getDepartmentList() {
      const data = await useDepartmentList<any>()
      this.departmentList = data.data.list
    },
    async getRoleList() {
      const data = await useRoleList<any>()
      this.roleList = data.data.list
    },
  },
})

export default useMainStore
