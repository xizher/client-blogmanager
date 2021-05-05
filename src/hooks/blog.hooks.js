import { storageUtils } from '@xizher/js-utils';
import { reactive, toRefs, watch } from 'vue';
import ext from '@xizher/js-ext'
import useLoading from './loading.hooks'

export function useCreate (mdContent) {
  const loading = useLoading()
  const state = reactive({
    title: '',
    description: '',
    keywords: [],
  })
  const sumbit = () => {
    loading.value = true
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
      .then(res => {
        loading.value = false
        return res.data
      })
  }
  return { ...toRefs(state), sumbit }
}

export function useList () {
  const token = storageUtils.local.get('token') ?? ''
  const loading = useLoading()
  const dataSource = reactive([])
  const columns = [
    { title: '标题', dataIndex: 'title', key: 'title', slots: { customRender: 'title' }, width: 350 },
    { title: '概要', dataIndex: 'description', key: 'description', slots: { customRender: 'description' }, width: 350 },
    { title: '关键词', dataIndex: 'keywords', key: 'keywords', slots: { customRender: 'keywords' }, width: 250 },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 220 },
    { title: '最后修改时间', dataIndex: 'modityTime', key: 'modityTime', width: 220 },
    { title: '是否公开', dataIndex: 'publish', key: 'publish', slots: { customRender: 'publish' }, width: 72 },
    { title: '', key: 'detials', slots: { customRender: 'detials' }, width: 64, fixed: 'right' },
  ]
  const pagination = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  })
  function loadDataSource () {
    loading.value = true
    return fetch('/api/blog/list', {
      method: 'get',
      headers: { token }
    })
      .then(res => res.json())
      .then(res => res.data)
      .then(res => {
        loading.value = false
        ext(dataSource).reset(...res.items)
        pagination.total = res.total
      })
  }
  return {
    dataSource, loadDataSource, columns, pagination
  }
}

export function useModity () {
  const loading = useLoading()
  const state = reactive({
    id: '', title: '', description: '',
    keywords: '', content: '', publish: false
  })
  const modity = () => {
    loading.value = true
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
      .then(res => {
        loading.value = false
        return res.data
      })
  }
  return { state, modity }
}
