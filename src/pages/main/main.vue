<script setup lang="ts">
import DefaultLayout from '@/components/layout/default-layout.vue'
</script>

<template>
  <div class="main">
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
  </div>
</template>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
}
</style>
