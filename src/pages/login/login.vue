<script setup lang="ts">
import loginContainer from './components/login-container.vue'
</script>

<template>
  <div class="login">
    <login-container class="login-container" />
  </div>
</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .login-container {
    margin-top: 200px;
  }
}
</style>
