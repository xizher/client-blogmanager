<template>
  <Table
    :columns="columns"
    :data-source="dataSource"
    :scroll="{ x: '100%' }"
    rowKey="id"
    size="small"
  >
    <template #description="{ text }">
      <Tooltip placement="bottom" :title="text">
        {{ text }}
      </Tooltip>
    </template>
    <template #keywords="{ text }">
      <Tooltip placement="bottom" :title="text.join(', ')">
        <Tag v-for="(item, index) in text" :key="index">{{ item }}</Tag>
      </Tooltip>
    </template>
    <template #detials="{ record }">
      <Button @click="showDetials(record)" size="small">详情</Button>
    </template>
    <template #publish="{ record }">
      <Switch :checked="record.publish" @change="e => handleChange(record, e)" />
    </template>
  </Table>
  <BlogDetialsModal v-model:visible="visible" :blog="blog" @loadDataSource="loadDataSource" />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useList, useModity } from '../../hooks/blog.hooks'
import { Table, Pagination, Tag, Button, Tooltip, Switch } from 'ant-design-vue'
import BlogDetialsModal from '../../components/modals/BlogDetialsModal.vue'
const { dataSource, columns, loadDataSource } = useList()
onMounted(() => loadDataSource())
const visible = ref(false)
const blog = reactive({})
function showDetials (item) {
  Object.assign(blog, item)
  visible.value = true
}
const { state, modity } = useModity()
function handleChange (item, publish) {
  Object.keys(state).forEach(key => state[key] = item[key])
  state.publish = publish
  modity().then(loadDataSource)
}
</script>

<style lang="scss">
.ant-table-row-cell-break-word {
  overflow-x: hidden;
}
.ant-table td { white-space: nowrap; }
*, *::before, *::after {
  box-sizing: border-box;
}
</style>
