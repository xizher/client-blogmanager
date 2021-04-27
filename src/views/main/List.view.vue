<template>
  <Table
    :columns="columns"
    :data-source="dataSource"
    rowKey="id"
    size="small"
  >
    <template #keywords="{ text }">
      <Tag v-for="(item, index) in text" :key="index">{{ item }}</Tag>
    </template>
    <template #detials="{ record }">
      <Button @click="showDetials(record)" size="small">详情</Button>
    </template>
  </Table>
  <BlogDetialsModal v-model:visible="visible" :blog="blog" @loadDataSource="loadDataSource" />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useList } from '../../hooks/blog.hooks'
import { Table, Pagination, Tag, Button } from 'ant-design-vue'
import BlogDetialsModal from '../../components/modals/BlogDetialsModal.vue'
const { dataSource, columns, loadDataSource } = useList()
onMounted(() => loadDataSource())
const visible = ref(false)
const blog = reactive({})
function showDetials (item) {
  Object.assign(blog, item)
  visible.value = true
}
</script>

<style scoped>

</style>
