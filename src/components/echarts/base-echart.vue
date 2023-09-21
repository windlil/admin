<script setup lang="ts">
/*
  使用动态路由，根据后端传入的用户菜单数据来动态创建路由。
  对系统的按钮权限进行了控制，通过后端返回的用户权限来在组件当中判断其是否具有按钮权限，从而显示或者隐藏。
  使用ts对axios进行了二次封装，使其有良好的类型提示，同时能更灵活的配置实例或全局的拦截器，例如：在每次请求头中自动添加token。
  对el-table等组件进行了二次的高阶封装，通过传入简单的配置来实现不同页面的表格展示。
  对echarts进行多层封装抽取，在图表展示需求多的情况下，通过配置不同的option值来生成各式各样的图表。
  运用pinia配合localStorage来实现数据的持久化，在页面刷新的情况下也依然能保持数据完整性。
  使用husky配合commitlint以及lint-staged来对git提交信息和代码风格进行规范约束。
*/
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  option: any
}>()

const echartRef = ref()
onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas',
  })
  echartInstance.setOption(props.option)
})
</script>

<template>
  <div ref="echartRef" class="echart" />
</template>

<style scoped>
.echart {
  width: 500px;
  height: 500px;
}
</style>
