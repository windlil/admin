<script setup lang="ts">
defineProps<{
  title: string
  btnName: string
}>()

const emits = defineEmits(['onClick'])

function clickBtn(e: MouseEvent) {
  emits('onClick', e)
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>
          {{ title }}
        </span>
        <el-button v-if="btnName" type="primary" @click="clickBtn">
          {{ btnName }}
        </el-button>
      </div>
    </template>
    <slot name="default" />
  </el-card>
</template>

<style scoped lang="less">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.el-card {
  padding: 5px !important;
}
</style>
