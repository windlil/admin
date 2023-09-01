<script setup lang="ts">
import { useRouter } from 'vue-router'
import { delStorage } from '@/utils/useStorage'
import { STORAGE_KEY } from '@/types/storage'

const router = useRouter()

function exit() {
  delStorage(STORAGE_KEY.ACCOUNT)
  delStorage(STORAGE_KEY.USERINFO)
  delStorage(STORAGE_KEY.USERMENU)
  delStorage(STORAGE_KEY.FIRST_MENU)
  router.push('/login')
}
</script>

<template>
  <div class="my-header">
    <div class="left-header">
      <img src="/vite.svg">
      <h1>CMS</h1>
    </div>
    <div class="right-header">
      <div>
        <el-icon style="color: #fff;">
          <Bell />
        </el-icon>
      </div>
      <div>
        <el-icon style="color: #fff;">
          <ChatLineRound />
        </el-icon>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="avatar">
              <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              <span>admin</span>
            </span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-icon><User /></el-icon>
                <span>个人信息</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon><Lock /></el-icon>
                <span>修改密码</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon><SwitchButton /></el-icon>
                <span @click="exit">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.my-header {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #9d9d9d30;

  .left-header {
    display: flex;
    align-items: center;

    h1 {
      margin-left: 10px;
      color: #fff;
      font-size: 16px;
    }
  }

  .right-header {
    display: flex;
    align-items: center;

    &>div {
      margin-right: 20px;
      cursor: pointer;
    }

    .avatar {
      display: flex;
      align-items: center;

      span {
        color: #fff;
        margin-left: 10px;
      }
    }
  }
}
</style>
