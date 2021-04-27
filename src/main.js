import { createApp } from 'vue'
import App from './App.vue'
import './style/index.css'
import router from './router'

const app = createApp(App)
  .use(router)

app.mount('#app')
