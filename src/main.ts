import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { createPinia } from 'pinia'
import { useMessagePlugin } from "@/plugins/message";
import '@/styles/global.scss'
import { loadGtagScript} from '@/utils/google.analytics';

loadGtagScript();

// 导入全局组件
import Components from './components'

// 创建应用实例
const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(i18n)
app.use(pinia)
app.use(useMessagePlugin)
app.use(Components)
app.mount('#app')
