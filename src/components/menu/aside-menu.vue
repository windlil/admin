<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/store/login'

const router = useRouter()
const route = useRoute()
const loginStore = useLoginStore()
const { usermenu } = storeToRefs(loginStore)

function getIconName(icon: string) {
  return icon.split('-')[2]
}

function to(url: any) {
  router.push(url)
}

const defaultActive = computed(() => {
  return route.path
})
</script>

<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="#dddddd"
      active-text-color="#fff"
    >
      <template v-for="item in usermenu" :key="item.id">
        <el-sub-menu :index="String(item.id)">
          <template #title>
            <el-icon>
              <component :is="getIconName(item.url)" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="children_item in item.children" :key="children_item.id">
            <el-menu-item :index="String(children_item.url)" @click="to(children_item.url)">
              {{ children_item.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
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

:deep(.el-menu) {
  margin: -1px !important;
}
</style>
