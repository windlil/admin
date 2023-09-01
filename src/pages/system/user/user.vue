<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Item } from './components/search-col.vue'
import SearchCol from './components/search-col.vue'
import Card from '@/components/card/card.vue'
import useSystemStorage from '@/store/system'
import { formatDate } from '@/utils/formatDate'

const systemStore = useSystemStorage()
const formRef = ref()
const { userlist, totalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(5)

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

function clickBtn(e: MouseEvent) {
  console.log(e)
}

function btnEnable(enable: number): string {
  console.log(enable)
  return enable ? 'success' : 'danger'
}

function handleSizeChange() {
  fetchUsersList()
}

function handleCurrentChange() {
  fetchUsersList()
}

function fetchUsersList() {
  const size = pageSize.value
  const offset = currentPage.value - 1
  systemStore.getUsersList({
    offset,
    size,
  })
}

fetchUsersList()
</script>

<template>
  <div class="user">
    <el-card class="box-card">
      <SearchCol :item-data="data" :form-ref="formRef" />
    </el-card>
    <Card title="用户列表" btn-name="新建用户" style="margin-top: 30px;" @on-click="clickBtn">
      <template v-if="userlist">
        <el-table :data="userlist" style="width: 100%">
          <el-table-column type="index" label="序号" width="120" align="center" />
          <el-table-column prop="name" label="姓名" width="120" align="center" />
          <el-table-column prop="realname" label="真实姓名" width="120" align="center" />
          <el-table-column prop="cellphone" label="手机号码" width="160" align="center" />
          <el-table-column prop="enable" label="状态" width="120" align="center">
            <template #default="scope">
              <el-button link :type="btnEnable(scope.row.enable)">
                {{ scope.row.enable ? '启用' : '禁用' }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="createAt" label="创建时间" width="220" align="center">
            <template #default="scope">
              {{ formatDate(scope.row.createAt) }}
            </template>
          </el-table-column>
          <el-table-column prop="updateAt" label="更新时间" width="220" align="center">
            <template #default="scope">
              {{ formatDate(scope.row.createAt) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <div class="btn-group">
              <el-button type="primary" size="small" plain>
                编辑
              </el-button>
              <el-button type="danger" size="small" plain>
                删除
              </el-button>
            </div>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped lang="less">
.box-card {
  padding: 25px;
  margin-bottom: 25px;
}

.btn-group {
  display: flex;
}

.pagination {
  display: flex;
  justify-content: end;
  margin-top: 20px;
  padding-right: 20px;
}
</style>
