import { createRouter, createMemoryHistory } from "vue-router"
import { useCheck } from "../hooks/login.hooks"

/** @type { import("vue-router").RouteRecordRaw[] } */
const routes = [
  { name: 'Login', path: '/login', component: () => import('../views/Login.view.vue') },
  {
    name: 'Main',
    path: '/main',
    component: () => import('../views/Main.view.vue'),
    children: [
      { name: 'Vis', path: '/main/vis', component: () => import('../views/main/Vis.view.vue') },
      { name: 'Create', path: '/main/create', component: () => import('../views/main/Create.view.vue') },
      { name: 'List', path: '/main/list', component: () => import('../views/main/List.view.vue') },
      { path: '/main', redirect: '/main/list' },
    ]
  },
  { path: '/', redirect: '/main' },
]

const router =  createRouter({
  routes,
  history: createMemoryHistory()
})

router.beforeEach(res => {
  if (res.path !== '/login') {
    useCheck().then(success => {
      if (!success) {
        router.push('/login')
      }
    })
  }
})

export default router