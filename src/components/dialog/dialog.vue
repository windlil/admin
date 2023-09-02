<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue'
import useSystemStore from '@/store/system/index'

defineProps<{
  departmentList: any
  roleList: any
}>()

const emits = defineEmits(['updateList'])

const systemStore = useSystemStore()
const dialogFormVisible = ref(false)
const formLabelWidth = '90px'
const isEdit = ref()
const userId = ref(0)

const form = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
})

function openDialog(initform?: any) {
  if (initform) {
    isEdit.value = true
  } else {
    isEdit.value = false
    userId.value = 0
  }

  dialogFormVisible.value = true

  if (initform) {
    nextTick(() => {
      form.cellphone = initform.cellphone
      form.name = initform.name
      form.realname = initform.realname
      form.departmentId = initform.departmentId
      form.roleId = initform.roleId
      userId.value = initform.id
    })
  }
}

watch(dialogFormVisible, () => {
  for (const item in form) {
    (form as any)[item] = ''
  }
})

function submit() {
  if (isEdit.value) {
    systemStore.editUser(userId.value, form).then(() => {
      emits('updateList', 'success')
    }).catch(() => {
      emits('updateList', 'error')
    })
  } else {
    systemStore.addUser(form).then(() => {
      emits('updateList', 'success')
    }).catch(() => {
      emits('updateList', 'error')
    })
  }
  dialogFormVisible.value = false
}

defineExpose({
  openDialog,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="新建用户" width="500">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realname">
        <el-input v-model="form.realname" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="!userId" label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" type="password" show-password autocomplete="off" />
      </el-form-item>
      <el-form-item label="联系号码" :label-width="formLabelWidth" prop="cellphone">
        <el-input v-model="form.cellphone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="选择权限" :label-width="formLabelWidth" prop="roleId">
        <el-select v-model="form.roleId" placeholder="请选择权限">
          <template v-for="item in roleList" :key="item.id">
            <el-option :label="item.name" :value="item.id" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门" :label-width="formLabelWidth" role="departmentId">
        <el-select v-model="form.departmentId" placeholder="请选择部门">
          <template v-for="item in departmentList" :key="item.id">
            <el-option :label="item.name" :value="item.id" />
          </template>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
