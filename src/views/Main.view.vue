<template>
  <Spin :spinning="loading">
    <AppHeader />
    <AppContent />
  </Spin>
</template>

<script setup>
import AppHeader from '../components/layouts/AppHeaders.vue'
import AppContent from '../components/layouts/AppContent.vue'
import { Spin } from 'ant-design-vue'
import useLoading from '../hooks/loading.hooks'
const loading = useLoading()
</script>

<style scoped>

</style>
