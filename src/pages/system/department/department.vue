<script setup lang="ts">
import { reactive } from 'vue'
import SearchCol from '@/components/search-col/search-col.vue'
import type { Item } from '@/components/search-col/search-col.vue'

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
</script>

<template>
  <div class="department">
    <el-card class="box-card">
      <SearchCol :item-data="data" />
    </el-card>
  </div>
</template>

<style scoped lang="less">

</style>
