<script setup lang="ts">
import MyHeader from './my-header.vue'
</script>

<template>
  <el-container class="container">
    <el-header class="header" style="background-color: #1b1b1b;">
      <MyHeader />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <AsideMenu />
      </el-aside>
      <el-main>
        <slot>
          content
        </slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  user-select: none !important;
}

:deep(.el-aside) {
  height: 100% !important;
  background-color: #222222;
  overflow: hidden;
}
</style>
