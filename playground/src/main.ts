import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createSmartForm } from '@s-form/core'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/var.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(createSmartForm())
app.mount('#app')
