<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function exit() {
  localStorage.removeItem('cms-account')
  router.push('/login')
}
</script>

<template>
  <div>
    <el-button @click="exit">
      退出登录
    </el-button>
  </div>
</template>

<style scoped lang="less">

</style>
