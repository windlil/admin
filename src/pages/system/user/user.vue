<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import type { Item } from '@/components/search-col/search-col.vue'
import SearchCol from '@/components/search-col/search-col.vue'
import MyTable from '@/components/my-table/my-table.vue'
import Dialog from '@/components/dialog/dialog.vue'
import Card from '@/components/card/card.vue'
import useSystemStorage from '@/store/system'
import 'element-plus/theme-chalk/el-message.css'
import useMainStore from '@/store/main/main'

const systemStore = useSystemStorage()
const formRef = ref()
const { userlist, totalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(5)
const dialogRef = ref<InstanceType<typeof Dialog>>()
const mainStore = useMainStore()
const { departmentList, roleList } = storeToRefs(mainStore)

const data = reactive<Item[]>([
  {
    name: 'name',
    type: 'input',
    label: '用户名',
    placeholder: '请输入查询的用户名',
  },
  {
    name: 'realname',
    type: 'input',
    label: '真实姓名',
    placeholder: '请输入查询的真实姓名',
  },
  {
    name: 'cellphone',
    type: 'input',
    label: '手机号码',
    placeholder: '请输入查询的手机号',
  },
  {
    name: 'enable',
    type: 'select',
    label: '状态',
    placeholder: '请选择查询的状态',
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
    label: '姓名',
  },
  {
    prop: 'realname',
    label: '真实姓名',
  },
  {
    prop: 'cellphone',
    label: '联系号码',
    width: '160',
  },
  {
    prop: 'enable',
    label: '状态',
  },
])

function clickBtn() {
  if (dialogRef.value) {
    dialogRef.value.openDialog()
  }
}

function fetchUsersList(form?: any) {
  const size = pageSize.value
  const offset = currentPage.value - 1
  systemStore.getUsersList({
    offset: form?.currentPage ?? offset,
    size: form?.pageSize ?? size,
  })
}

function handleChange(form: any) {
  fetchUsersList(form)
}

function search(form: any) {
  console.log(form)
  fetchUsersList(form)
}

function reset() {
  fetchUsersList()
}

function deleteUserById(id: number) {
  systemStore.deleteUser(id).then(() => {
    ElMessage({
      type: 'success',
      message: '删除用户成功',
    })
    reset()
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '删除用户失败',
    })
  })
}

function updateList(result: 'success' | 'error') {
  reset()
  ElMessage({
    type: result,
    message: result === 'success' ? '操作成功' : '操作失败',
  })
}

function editUsersById(form: number) {
  dialogRef.value?.openDialog(form)
}

fetchUsersList()

mainStore.getDepartmentList()
mainStore.getRoleList()
</script>

<template>
  <div class="user">
    <el-card class="box-card">
      <SearchCol :item-data="data" :form-ref="formRef" @on-search="search" @on-reset-emit="reset" />
    </el-card>
    <Card title="用户列表" btn-name="新建用户" style="margin-top: 30px;" @on-click="clickBtn">
      <MyTable
        :type-list="typeList"
        :userlist="userlist"
        :total-count="totalCount"
        @edit="editUsersById"
        @del="deleteUserById"
        @change-emit="handleChange"
      />
    </Card>
  </div>
  <Dialog ref="dialogRef" :department-list="departmentList" :role-list="roleList" @update-list="updateList" />
</template>
