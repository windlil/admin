<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from '@/utils/formatDate'

defineProps<{
  userlist: any
  totalCount: number
}>()

const emits = defineEmits(['edit', 'del', 'changeEmit'])

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
  emits('changeEmit', handleChange, pageSize)
}
</script>

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
      <template #default="scope">
        <div class="btn-group">
          <el-button type="primary" size="small" plain @click="edit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" plain @click="del(scope.row.id)">
            删除
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
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
