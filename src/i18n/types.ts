import zhCN from './locales/zh-CN'

// 定义语言包类型
export type MessageSchema = typeof zhCN

// 声明模块扩展
declare module 'vue-i18n' {
  // 定义 Composer 接口的 messages 类型
  export interface DefineLocaleMessage extends MessageSchema {}
  
  // 扩展 Composer 接口的类型
  export interface ComposerCustom {
    messages: MessageSchema
  }
}
