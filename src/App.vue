<script setup lang="ts">
import { ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const locale = ref(zhCn)
</script>

<template>
  <ElConfigProvider :locale="locale">
    <div class="app">
      <router-view />
    </div>
  </ElConfigProvider>
</template>

<style scoped lang="less">
.app {
  width: 100%;
  height: 100%;
  background-color: #eee;
}
</style>
