<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { IForm } from '@/types/login'
import { useLoginStore } from '@/store/login/index'

const formRef = ref()
const checked = ref(true)
const dialogVisible = ref(false)
const loginStore = useLoginStore()

const form = reactive<IForm>({
  username: '',
  password: '',
})

const formRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[0-9a-zA-Z]{6,20}$/, message: '必须是6~20位长度', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[0-9z-zA-Z]{3,}$/, message: '必须是3位以上数字或大小写字母', trigger: 'change' },
  ],
})

function handleClose() {
  dialogVisible.value = false
}

function login(formEl: any) {
  formEl.validate((valid: any) => {
    if (valid) {
      loginStore.fetchLogin(form)
    } else {
      return false
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="title">
      <el-icon size="large" color="#9d9d9d">
        <Avatar />
      </el-icon>
      <h1>
        后台管理系统
      </h1>
    </div>
    <el-form
      ref="formRef"
      :rules="formRules"
      class="el-form"
      :model="form"
    >
      <el-form-item label="账号:" prop="username">
        <el-input v-model="form.username" style="width: 240px;" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="form.password" show-password style="width: 240px;" />
      </el-form-item>
      <el-form-item class="checkbox-item">
        <el-checkbox v-model="checked" label="记住密码" size="large" />
        <el-link type="primary" :underline="false" @click="dialogVisible = true">
          忘记密码
        </el-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 280px;" @click="login(formRef)">
          立即登录
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%"
      :before-close="handleClose"
    >
      <span>密码遗忘, 请咨询系统管理员。</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.login-container {
  box-sizing: border-box;
  width: 380px;
  height: 290px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px #d2d2d2;
  user-select: none;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
    margin-bottom: 10px;

    h1 {
      font-size: 22px;
      margin-left: 5px;
      font-family: 'STXihei', Courier, monospace;
      color: #9d9d9d;
    }
  }

  .el-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .btn {
      width: 100%;
    }

    .checkbox-item {
      width: 100%;
      box-sizing: border-box;
      padding: 0 55px;
      margin-bottom: 0 !important;
    }
  }
}

:deep(.el-form-item__content) {
  justify-content: space-between !important;
}
</style>
