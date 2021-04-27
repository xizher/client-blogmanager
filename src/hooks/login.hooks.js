import { reactive, toRef } from "vue"
import { cryptoUtils, storageUtils } from '@xizher/js-utils'

export function useCheck () {
  const token = storageUtils.local.get('token')
  return fetch('/api/account/check', {
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ token })
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        return false
      }
      storageUtils.local.set('account', res.data)
      return true
    })
}

export default function () {
  storageUtils.local.remove('account').remove('token')
  const state = reactive({
    account: '',
    password: '',
  })
  /** @returns { Promise<boolean> } */
  function login () {
    return fetch('/api/account/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        account: state.account,
        password: cryptoUtils.encrypto(cryptoUtils.encrypto(state.password))
      })
    })
      .then(res => res.json())
      .then(res => res.data)
      .then(res => {
        if (res.success) {
          storageUtils.local
            .set('account', res.account)
            .set('token', res.token)
          return true
        }
        return false
      })
  }
  return {
    account: toRef(state, 'account'),
    password: toRef(state, 'password'),
    login
  }
}
