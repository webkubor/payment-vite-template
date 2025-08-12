/**
 * 将数字或字符串格式化为货币形式
 *
 * @param {number | string} num - 要格式化的数字或字符串
 * @return {string} - 格式化后的货币字符串
 * @throws {Error} - 如果输入不是数字或字符串，或者无法转换为数字，将抛出错误
 */
export function toCurrency(num: number | string): string {
  const value = typeof num === 'string'? parseFloat(num) : num;
  if (isNaN(value)) {
    return '-';
  }
  return value.toLocaleString('en-US');
}




/**
 * @description: 将字符串按指定宽度的字符一组分割
 * @param {string} payCode 要处理的字符串
 * @param {number} width 每组字符的宽度，默认为 4
 * @return {string} 分割后的字符串，如果传入的字符串为空则返回 '------'
 */
export function formatPayCode(payCode: string, width: number = 4): string {
  if (payCode) {
    // 动态生成正则表达式
    const regex = new RegExp(`(.{${width}})`, 'g');
    return payCode.replace(regex, '$1 ').trim();
  } else {
    return '------';
  }
}

/**
* @description: 驼峰返回
* @return {*}
*/  

export function capitalizeFirstLetter(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}