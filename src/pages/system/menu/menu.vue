<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import RolepDialog from '@/components/dialog/role-dialog.vue'
import useMainStore from '@/store/main/main'
import { useTableHook } from '@/hooks/tableHook'

const dialogRef = ref<InstanceType<typeof RolepDialog>>()
const mainStore = useMainStore()
mainStore.getDepartmentList()
const { departmentList } = storeToRefs(mainStore)

const typeList = reactive([
  {
    prop: 'name',
    label: '菜单名称',
  },
  {
    prop: 'type',
    label: '级别',
  },
  {
    prop: 'url',
    label: '菜单url',
  },
])

const config = {
  name: '',
  btnText: '新建菜单',
}

const { newData, del, edit, handleChange, updateList, pageList } = useTableHook('menu', dialogRef, config)
</script>

<template>
  <div class="menu">
    <Card v-if="pageList" title="菜单列表" style="margin-top: 30px;" @on-click="newData">
      <MyTable
        table-name="menu"
        :no-pag="true"
        :no-control="true"
        :type-list="typeList"
        :userlist="pageList"
        @change-emit="handleChange"
        @del="del"
        @edit="edit"
      />
    </Card>
  </div>
  <RolepDialog ref="dialogRef" :department-list="departmentList" @update-list="updateList" />
</template>
