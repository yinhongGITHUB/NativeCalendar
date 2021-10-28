/**
 * 节流函数
 * @param {Number} time 时间差 单位/毫秒
 * @returns 
 */
// 节流函数的上一个时间戳
let lastTimestamp = null
export function throttle(time) {
  let nowTimestamp = new Date().getTime()
  if (!lastTimestamp) { // 说明第一次进来
    lastTimestamp = new Date().getTime()
    return true
  }
  if (nowTimestamp - lastTimestamp > time) {
    lastTimestamp = nowTimestamp;
    return true
  }
  return false
}