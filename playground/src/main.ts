import { createApp } from 'vue'
import { createSmartForm } from '@s-form/core'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'

createApp(App).use(createSmartForm()).mount('#app')
