import useClipboard from 'vue-clipboard3'

/**
 * @description: 写入剪贴板
 * @param {string} text - 要复制的文本
 * @param {string} successContent - 成功提示信息
 * @return {Promise<void>}
 */
export async function writeClipboard(
  text: string,
  successContent: string = "copy successfully"
) {
  if (!text) {
    window.$message?.error("Clipboard content is empty");
    return
  } 
  try {
    const { toClipboard } = useClipboard()
    await toClipboard(text)
    window.$message?.success(successContent);
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description: 从剪贴板读取内容
 * @param {Function} t - 国际化函数
 * @return {Promise<string>} - 剪贴板内容
 */
export async function readClipboard(t: Function): Promise<string> {
  try {
    // 检查是否支持 Clipboard API
    if (navigator.clipboard && navigator.clipboard.readText) {
      const text = await navigator.clipboard.readText();
      if (text) {
        return text.trim();
      } else {
        window.$message?.warning(t('main.clipboardEmpty'));
      }
    } else {
      window.$message?.error(t('main.clipboardNotSupported'));
    }
  } catch (error) {
    console.error('Failed to read clipboard:', error);
    window.$message?.error(t('main.clipboardReadFailed'));
  }
  return '';
}
