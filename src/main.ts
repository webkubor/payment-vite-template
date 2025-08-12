import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { useMessagePlugin } from "@/plugins/message";
import 'dayjs/locale/zh-cn'

// 导入全局样式
import '@/styles/global.scss'

// 创建应用实例
const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(useMessagePlugin)
app.mount('#app')
