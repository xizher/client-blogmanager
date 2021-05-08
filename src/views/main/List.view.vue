<template>
  <Table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    position="both"
    @change="handleTableChange"
    :scroll="{ x: '100%' }"
    rowKey="id"
    size="small"
  >
    <template #title="{ text }">
      <Tooltip placement="bottom" :title="text">
        {{ text }}
      </Tooltip>
    </template>
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
    <template #publish="{ record }">
      <Switch :checked="record.publish" @change="e => handleChange(record, e)" />
    </template>
    <template #detials="{ record }">
      <Button @click="showDetials(record)" size="small">详情</Button>
    </template>
    <template #customTitle>
      <Button @click="loadDataSource" size="small">刷新</Button>
    </template>
  </Table>
  <BlogDetialsModal v-model:visible="visible" :blog="blog" @loadDataSource="loadDataSource" />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useList, useModity } from '../../hooks/blog.hooks'
import { Table, Pagination, Tag, Button, Tooltip, Switch } from 'ant-design-vue'
import BlogDetialsModal from '../../components/modals/BlogDetialsModal.vue'
const { dataSource, columns, loadDataSource, pagination } = useList()
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
function handleTableChange (e) {
  Object.keys(e).forEach(key => pagination[key] = e[key])
}
</script>

<style lang="scss">
.ant-table-row-cell-break-word {
  overflow-x: hidden;
  text-overflow:ellipsis;
}
.ant-table td { white-space: nowrap; }
*, *::before, *::after {
  box-sizing: border-box;
}
</style>
