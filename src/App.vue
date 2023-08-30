<script setup lang="ts">
import DefaultLayout from '@/components/layout/default-layout.vue'
</script>

<template>
  <div class="app">
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
  </div>
</template>

<style scoped lang="less">
.app {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  overflow: hidden;
}
</style>
