import { defineStore } from 'pinia'
import { useDepartmentList, useEntireMenuList, useRoleList } from '@/service/modules/system'

const useMainStore = defineStore('mainStore', {
  state: () => ({
    roleList: '',
    departmentList: '',
    entireMenuList: '',
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
    async getMenuList() {
      const data = await useEntireMenuList<any>()
      this.entireMenuList = data.data.list
    },
  },
})

export default useMainStore
