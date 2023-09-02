<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue'
import useSystemStore from '@/store/system/index'

defineProps<{
  departmentList?: any
  roleList?: any
}>()

const emits = defineEmits(['updateList'])

const systemStore = useSystemStore()
const dialogFormVisible = ref(false)
const formLabelWidth = '90px'
const isEdit = ref()
const userId = ref(0)

const form = reactive({
  name: '',
  parentId: '',
  leader: '',
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
      form.name = initform.name
      form.parentId = initform.parentId
      form.leader = initform.leader
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
    systemStore.editPageData('department', userId.value, form).then(() => {
      emits('updateList', 'success')
    }).catch(() => {
      emits('updateList', 'error')
    })
  } else {
    systemStore.newPageData('department', form).then(() => {
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
  <el-dialog v-model="dialogFormVisible" title="新建部门" width="500">
    <el-form :model="form">
      <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="部门领导" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.leader" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上级部门" :label-width="formLabelWidth" role="departmentId">
        <el-select v-model="form.parentId" placeholder="请选择部门">
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
