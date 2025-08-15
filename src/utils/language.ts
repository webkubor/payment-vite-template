import { message } from '../plugins/message'
import { Ref } from 'vue'
import i18n from '../i18n'

/**
 * @description: 切换语言（在韩文和英文之间切换）
 * @param {Ref<string>} [currentLang] - 可选的当前语言状态变量，用于同步更新
 * @param {boolean} [showMessage=true] - 是否显示成功消息
 * @return {void}
 */
export function toggleLanguage(currentLang?: Ref<string>, showMessage: boolean = true) {
  const locale = i18n.global.locale
  // 在韩国和英文之间切换
  locale.value = locale.value === 'ko-KR' ? 'en-US' : 'ko-KR'
  
  // 如果提供了当前语言状态变量，同步更新
  if (currentLang) {
    currentLang.value = locale.value
  }
  
  // 显示成功消息
  if (showMessage) {
    message.success(i18n.global.t('common.languageChanged'))
  }
}

/**
 * @description: 设置特定语言
 * @param {string} lang - 要设置的语言代码
 * @param {Ref<string>} [currentLang] - 可选的当前语言状态变量，用于同步更新
 * @param {boolean} [showMessage=true] - 是否显示成功消息
 * @return {void}
 */
export function setLanguage(lang: 'ko-KR' | 'en-US', currentLang?: Ref<string>, showMessage: boolean = true) {
  const locale = i18n.global.locale
  // 设置指定语言
  locale.value = lang
  
  // 如果提供了当前语言状态变量，同步更新
  if (currentLang) {
    currentLang.value = lang
  }
  
  // 显示成功消息
  if (showMessage) {
    message.success(i18n.global.t('common.languageChanged'))
  }
}
