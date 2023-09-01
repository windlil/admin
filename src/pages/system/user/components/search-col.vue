<script setup lang="ts">
import { reactive } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'

export interface Item {
  name: string
  type: 'input' | 'select' | 'datepicker'
  label?: string
  placeholder?: string
}

defineProps<{
  itemData: Item[]
  formRef: any
}>()

const emits = defineEmits(['onSearch', 'onResetEmit'])

const form = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: '',
})

function resetFormValue() {
  for (const item in form) {
    (form as any)[item] = ''
  }
  emits('onResetEmit')
}
function search() {
  emits('onSearch', form)
}
</script>

<template>
  <el-form>
    <el-row :gutter="24">
      <template v-for="item in itemData" :key="item.label">
        <el-col :span="8">
          <!-- input -->
          <template v-if="item.type === 'input'">
            <el-form-item :label="item.label">
              <el-input v-model="(form as any)[item.name]" :placeholder="item.placeholder" />
            </el-form-item>
          </template>
          <!-- select -->
          <template v-if="item.type === 'select'">
            <el-form-item :label="item.label">
              <el-select v-model="form.enable" :placeholder="item.placeholder" style="width: 100%;">
                <el-option label="禁用" :value="0" />
                <el-option label="启用" :value="1" />
              </el-select>
            </el-form-item>
          </template>
          <!-- datepicker -->
          <template v-if="item.type === 'datepicker'">
            <el-form-item :label="item.label">
              <el-date-picker
                v-model="form.createAt"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
          </template>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <div class="btn-container">
    <el-button plain :icon="Refresh" @click="resetFormValue">
      重置
    </el-button>
    <el-button type="primary" plain :icon="Search" @click="search">
      查询
    </el-button>
  </div>
</template>

<style scoped lang="less">
.el-form-item {
  margin-bottom: 30px;
}

.btn-container {
  display: flex;
  justify-content: end;
}
</style>
