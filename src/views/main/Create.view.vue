<template>
  <div class="container">
    <VMdEditor
      v-model="mdContent"
      height="100%"
      left-toolbar="h bold italic strikethrough quote | ul ol table hr | link image code | submit"
      right-toolbar="preview toc"
      :toolbar="customToolbar"
      :include-level="[2, 3, 4]"
    />
  </div>
  <CreateBlogModal
    v-model:visible="visible"
    :md-content="mdContent"
  />
</template>

<script setup>
import { ref } from 'vue'
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
VMdEditor.use(githubTheme);
import Codemirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/lib/codemirror.css'
VMdEditor.Codemirror = Codemirror
import CreateBlogModal from '../../components/modals/CreateBlogModal.vue'

const visible = ref(false)
const mdContent = ref('')
const customToolbar = {
  'submit': {
    title: '提交',
    icon: 'v-md-icon-save',
    action () {
      visible.value = true
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
