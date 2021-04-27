<template>
  <Modal
    :visible="visible"
    title="文档详情"
    centered
    @cancel="cancel"
    @ok="modityExec"
    okText="保存"
    cancelText="关闭"
    width="80vw"
    :maskClosable="false"
    :keyboard="false"
  >
    <div class="form-item"><span class="label">标题</span><Input v-model:value="state.title" /></div>
    <div class="form-item"><span class="label">概要</span><Input v-model:value="state.description" /></div>
    <div class="form-item">
      <span class="label">关键词</span>
      <Select
        v-model:value="state.keywords"
        style="width: 100%"
        mode="tags"
      />
    </div>
    <div class="form-item">
      <span class="label">内容</span>
      <VMdEditor
        class="markdown-editor"
        v-model="state.content"
        left-toolbar="h bold italic strikethrough quote | ul ol table hr | link image code"
        right-toolbar="preview toc fullscreen"
        :include-level="[2, 3, 4]"
      />
    </div>
  </Modal>
</template>

<script setup>
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
import { reactive, watch } from 'vue'
import { Modal, Button, Input, Select } from 'ant-design-vue'
import { useModity } from '../../hooks/blog.hooks';
const props = defineProps({
  visible: { type: Boolean, default: false },
  blog: { type: Object, default: () => {} },
})
const emit = defineEmit(['update:visible', 'loadDataSource'])
const cancel = () => emit('update:visible', false)
const { state, modity } = useModity()
watch(() => props.visible, visible => {
  visible && Object.keys(state).forEach(key => state[key] = props.blog[key])
})
function modityExec () {
  modity().then(res => {
    if (res) {
      emit('loadDataSource')
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
.markdown-editor {
  height: 50vh;
}
</style>
