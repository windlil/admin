<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import SearchCol from '@/components/search-col/search-col.vue'
import RolepDialog from '@/components/dialog/role-dialog.vue'
import type { Item } from '@/components/search-col/search-col.vue'
import useMainStore from '@/store/main/main'
import { useTableHook } from '@/hooks/tableHook'

const dialogRef = ref<InstanceType<typeof RolepDialog>>()
const mainStore = useMainStore()
mainStore.getDepartmentList()
const { departmentList } = storeToRefs(mainStore)

const data = reactive<Item[]>([
  {
    name: 'name',
    type: 'input',
    label: '角色名称',
    placeholder: '请输入角色名称',
  },
  {
    name: 'intro',
    type: 'input',
    label: '权限介绍',
    placeholder: '请输入查询的权限介绍',
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
    label: '权限名称',
  },
  {
    prop: 'intro',
    label: '权限介绍',
  },
])

const { search, reset, newData, del, edit, handleChange, updateList, pageList, pageTotalCount } = useTableHook('role', dialogRef)
</script>

<template>
  <div class="role">
    <el-card class="box-card">
      <SearchCol :item-data="data" @on-search="search" @on-reset-emit="reset" />
    </el-card>
    <Card v-if="pageList" title="角色列表" btn-name="新建角色" style="margin-top: 30px;" @on-click="newData">
      <MyTable
        :type-list="typeList"
        :userlist="pageList"
        :total-count="pageTotalCount"
        @change-emit="handleChange"
        @del="del"
        @edit="edit"
      />
    </Card>
  </div>
  <RolepDialog ref="dialogRef" :department-list="departmentList" @update-list="updateList" />
</template>
