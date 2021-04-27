<template>
  <Modal
    :visible="visible"
    title="提交创建文档"
    centered
    @cancel="cancel"
    @ok="sumbitExec"
    okText="创建"
    cancelText="关闭"
  >
    <div class="form-item"><span class="label">标题</span><Input v-model:value="title" /></div>
    <div class="form-item"><span class="label">概要</span><Input v-model:value="description" /></div>
    <div class="form-item">
      <span class="label">关键词</span>
      <Select
        v-model:value="keywords"
        style="width: 100%"
        mode="tags"
      />
    </div>
  </Modal>
</template>

<script setup>
import { defineEmit, defineProps, toRef } from 'vue'
import { Modal, Button, Input, Select } from 'ant-design-vue'
import { useCreate } from '../../hooks/blog.hooks'
const props = defineProps({
  visible: { type: Boolean, default: false },
  mdContent: { type: String, default: '' },
})
const emit = defineEmit(['update:visible'])
const { title, description, keywords, sumbit } = useCreate(toRef(props, 'mdContent'))
const cancel = () => emit('update:visible', false)
const sumbitExec = () => {
  sumbit().then(res => {
    if (res) {
      cancel()
    }
  })
}
</script>

<style scoped lang="scss">
.form-item {
  margin: 8px 0;
  display: flex;
  .label {
    width: 80px;
    text-align: center;
  }
}
</style>
