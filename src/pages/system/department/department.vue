<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import SearchCol from '@/components/search-col/search-col.vue'
import depdialog from '@/components/dialog/dep-dialog.vue'
import type { Item } from '@/components/search-col/search-col.vue'
import useMainStore from '@/store/main/main'
import { useTableHook } from '@/hooks/tableHook'

const dialogRef = ref<InstanceType<typeof depdialog>>()
const mainStore = useMainStore()
mainStore.getDepartmentList()
const { departmentList } = storeToRefs(mainStore)

const data = reactive<Item[]>([
  {
    name: 'name',
    type: 'input',
    label: '部门名称',
    placeholder: '请输入部门名称',
  },
  {
    name: 'leader',
    type: 'input',
    label: '部门领导',
    placeholder: '请输入部门领导',
  },
  {
    name: 'createAt',
    type: 'datepicker',
    label: '创建时间',
  },
])

const typeList = reactive([
  {
    prop: 'name',
    label: '部门名称',
  },
  {
    prop: 'leader',
    label: '部门领导',
  },
  {
    prop: 'parentId',
    label: '上级部门',
  },
])

const config = {
  name: 'department',
  btnText: '新建部门',
}

const { search, reset, newData, del, edit, handleChange, isCreate, updateList, pageList, pageTotalCount } = useTableHook('department', dialogRef, config)
</script>

<template>
  <div class="department">
    <el-card class="box-card">
      <SearchCol :item-data="data" @on-search="search" @on-reset-emit="reset" />
    </el-card>
    <Card v-if="pageList" title="部门列表" :btn-name="isCreate" style="margin-top: 30px;" @on-click="newData">
      <MyTable
        table-name="department"
        :type-list="typeList"
        :userlist="pageList"
        :total-count="pageTotalCount"
        @change-emit="handleChange"
        @del="del"
        @edit="edit"
      />
    </Card>
  </div>
  <DepDialog ref="dialogRef" :department-list="departmentList" @update-list="updateList" />
</template>
