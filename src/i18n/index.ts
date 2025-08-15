import { createI18n } from 'vue-i18n'
import koKR from './locales/ko.json'
import enUS from './locales/en.json'

// 导入类型声明和语言配置
import './types'
import { getLocalLang } from './config'

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用组合式 API
  locale: getLocalLang(), // 动态获取语言
  fallbackLocale: 'en-US', // 备用语言
  messages: {
    'ko-KR': koKR,
    'en-US': enUS
  },
  globalInjection: true, // 全局注入 $t 方法
  silentTranslationWarn: true, // 关闭翻译警告
})

export default i18n
