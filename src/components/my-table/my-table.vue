<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/formatDate'
import { useLoginStore } from '@/store/login'

interface TypeItem {
  prop: string
  label: string
  width?: string
}

const props = defineProps<{
  tableName: string
  userlist: any
  totalCount?: number
  typeList: TypeItem[]
  noPag?: boolean
  noControl?: boolean
}>()

const emits = defineEmits(['edit', 'del', 'changeEmit'])

const store = useLoginStore()
const { permission } = storeToRefs(store)

console.log(permission.value)

const isEdit = (permission.value as any).includes(`system:${props.tableName}:update`)
const isDel = (permission.value as any).includes(`system:${props.tableName}:delete`)

const currentPage = ref(1)
const pageSize = ref(5)

function btnEnable(enable: number): string {
  return enable ? 'success' : 'danger'
}

function edit(row: any) {
  emits('edit', row)
}

function del(id: number) {
  emits('del', id)
}

function handleChange() {
  emits('changeEmit', {
    currentPage: currentPage.value - 1,
    pageSize: pageSize.value,
  })
}
</script>

<template v-if="userlist">
  <el-table :data="userlist" style="width: 100%">
    <el-table-column type="index" label="序号" width="120" align="center" />
    <template v-for="item in typeList" :key="item.prop">
      <el-table-column :prop="item.prop" :label="item.label" :width="item.width ?? ''" align="center" />
      <el-table-column v-if="item.prop === 'enable'" prop="enable" label="状态" width="120" align="center">
        <template #default="scope">
          <el-button link :type="btnEnable(scope.row.enable)">
            {{ scope.row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>
      </el-table-column>
    </template>
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
    <el-table-column v-if="!noControl" label="操作" width="120" align="center">
      <template #default="scope">
        <div class="btn-group">
          <el-button v-if="isEdit" type="primary" size="small" plain @click="edit(scope.row)">
            编辑
          </el-button>
          <el-button v-if="isDel" type="danger" size="small" plain @click="del(scope.row.id)">
            删除
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      v-if="!noPag"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleChange"
      @current-change="handleChange"
    />
  </div>
</template>

<style scoped>
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
