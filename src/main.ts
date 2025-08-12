import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

// 导入全局样式
import '@/styles/global.scss'

// 使用中文语言包
dayjs.locale('zh-cn')

// 创建应用实例
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')
