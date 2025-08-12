import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { useMessagePlugin } from "./plugins/message";
import '@/styles/global.scss'

// 创建应用实例
const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(useMessagePlugin)
app.mount('#app')
