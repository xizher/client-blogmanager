import { storageUtils } from '@xizher/js-utils';
import { reactive, toRefs } from 'vue';
import ext from '@xizher/js-ext'

export function useCreate (mdContent) {
  const state = reactive({
    title: '',
    description: '',
    keywords: [],
  })
  const sumbit = () => {
    const token = storageUtils.local.get('token') ?? ''
    return fetch('/api/blog/add', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': token
      },
      body: JSON.stringify({
        ...state,
        content: mdContent.value
      }),
    })
      .then(res => res.json())
      .then(res => res.data)
  }
  return { ...toRefs(state), sumbit }
}

export function useList () {
  const dataSource = reactive([])
  const columns = [
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '概要', dataIndex: 'description', key: 'description' },
    { title: '关键词', dataIndex: 'keywords', key: 'keywords', slots: { customRender: 'keywords' } },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '最后修改时间', dataIndex: 'modityTime', key: 'modityTime' },
    { title: '', key: 'detials', slots: { customRender: 'detials' } },
  ]
  function loadDataSource () {
    return fetch('/api/blog/list', {
      method: 'get'
    })
      .then(res => res.json())
      .then(res => res.data)
      .then(res => {
        ext(dataSource).reset(...res.items)
      })
  }
  return {
    dataSource, loadDataSource, columns
  }
}

export function useModity () {
  const state = reactive({
    id: '', title: '', description: '',
    keywords: '', content: '',
  })
  const modity = () => {
    const token = storageUtils.local.get('token') ?? ''
    return fetch('/api/blog/modity', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': token
      },
      body: JSON.stringify({
        ...state,
      }),
    })
      .then(res => res.json())
      .then(res => res.data)
  }
  return { state, modity }
}
