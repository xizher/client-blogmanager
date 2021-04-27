<template>
  <div class="content">
    <RouterView />
  </div>
</template>

<script setup>
import { } from 'vue'
</script>

<style scoped lang="scss">
.content {
  height: calc(100vh - 48px);
  overflow: auto;
  background-color: #F7F7F7;
}
</style>
