import dayjs from "@/plugins/dayjs";

/**
 * 计算从当前时间到目标时间的秒数差。
 * 如果目标时间已过，返回 0。
 *
 * @param {number} targetTime - 目标时间的 Unix 时间戳（秒）。
 * @return {number} - 从当前时间到目标时间的秒数差。
 */
export function getExpireSeconds(targetTime: number) {
  const now = dayjs();
  const diffInSeconds = targetTime ? Math.max(targetTime - now.unix(), 0) : 0;
  return diffInSeconds
}




/**
 * 将给定的输入转换为 dayjs 时间戳。
 * 如果输入是数字，则假定它是 Unix 时间戳（秒或毫秒），并相应地进行转换。
 * 如果输入不是数字，则将其视为日期字符串并直接转换。
 *
 * @param {string | number} input - 要转换的输入，可以是日期字符串或 Unix 时间戳。
 * @return {dayjs.Dayjs} - 转换后的 dayjs 对象。
 */
export function convertToTimestamp(input) {
  const isUnixTimestamp = /^[0-9]+$/.test(input); // 判断是否为数字形式的时间戳

  if (isUnixTimestamp) {
    const isMilliseconds = input.length === 13; // 判断是否是毫秒级时间戳

    if (isMilliseconds) {
      return dayjs(parseInt(input, 10));
    } else {
      return dayjs.unix(parseInt(input, 10));
    }
  } else {
    return dayjs(input);
  }
}



/**
 * 根据时区和时间戳获取格式化的当地时间
 * @param {string} timeZone - 时区，例如 "America/New_York" 或 "Asia/Shanghai"
 * @param {number|string|Date} timestamp - 时间戳，支持毫秒级数字、日期字符串或 Date 对象
 * @param {string} format - 格式化字符串，例如 "YYYY-MM-DD HH:mm:ss"
 * @returns {string} 格式化后的当地时间
 */
export function getFormattedLocalTime(timeZone, timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!timeZone || !timestamp) {
      return '-'
  }
  return dayjs(timestamp).tz(timeZone).format(format);
}
