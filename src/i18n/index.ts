import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

// 导入类型声明
import './types'

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用组合式 API
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'en-US', // 备用语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
  globalInjection: true, // 全局注入 $t 方法
  silentTranslationWarn: true, // 关闭翻译警告
})

export default i18n
