<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/system/index'
import useMainStore from '@/store/main/main'

defineProps<{
  departmentList?: any
  roleList?: any
}>()

const emits = defineEmits(['updateList'])
const mainStore = useMainStore()
mainStore.getMenuList()
const { entireMenuList } = storeToRefs(mainStore)
const systemStore = useSystemStore()
const dialogFormVisible = ref(false)
const formLabelWidth = '90px'
const isEdit = ref()
const userId = ref(0)

const form = reactive({
  name: '',
  intro: '',
  menuList: [''],
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
      form.intro = initform.intro
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
    systemStore.editPageData('role', userId.value, form).then(() => {
      emits('updateList', 'success')
    }).catch(() => {
      emits('updateList', 'error')
    })
  } else {
    systemStore.newPageData('role', form).then(() => {
      emits('updateList', 'success')
    }).catch(() => {
      emits('updateList', 'error')
    })
  }
  dialogFormVisible.value = false
}

function handleCheck(_: any, data2: any) {
  const menulist = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  console.log(menulist)
  form.menuList = menulist
}

defineExpose({
  openDialog,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="新建角色" width="500">
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色介绍" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.intro" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="entireMenuList" label="角色权限" :label-width="formLabelWidth">
        <el-tree
          :data="entireMenuList"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheck"
        />
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
