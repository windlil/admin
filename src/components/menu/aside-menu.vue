<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/store/login'

const loginStore = useLoginStore()
const { usermenu } = storeToRefs(loginStore)

function handleOpen(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}

function getIconName(icon: string) {
  return icon.split('-')[2]
}
</script>

<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="#dddddd"
      active-text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in usermenu" :key="item.id">
        <el-sub-menu :index="item.url">
          <template #title>
            <el-icon>
              <component :is="getIconName(item.icon)" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="children_item in item.children" :key="children_item.id">
            <el-menu-item :index="children_item.url">
              {{ children_item.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><location /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="2-1">
          用户管理
        </el-menu-item>
        <el-menu-item index="2-2">
          部门管理
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.el-menu-item.is-active, .el-menu-item:hover {
  color: #ffd04b !important;
  background-color: #323538;
}

:deep(.el-menu--inline) {
  background-color: #3e4246 !important;
}
</style>
