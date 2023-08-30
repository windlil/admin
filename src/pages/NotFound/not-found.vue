<script setup lang="ts">

</script>

<template>
  <div class="not-found">
    <el-result
      icon="error"
      title="当前页面不存在, 请重新尝试, 或联系系统管理员"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">
          返回
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped lang="less">
.not-found {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
