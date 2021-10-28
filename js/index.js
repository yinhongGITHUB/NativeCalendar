import {
  showTitle
} from './showTitle.js'
import {
  showTools
} from './showTools.js'
import {
  showContent
} from './showContent.js'
import {
  dragCalendar
} from '../common/dragCalendar.js'
// 全局变量初始化
export let today = new Date();
let yy = today.getFullYear(); // 年
export function setYy(val){
  yy = val
}
export function getYy(){
  return yy
}
let mo = today.getMonth() + 1; // 月
export function setMo(val){
  mo = val
}
export function getMo(){
  return mo
}
let dd = today.getDate(); // 日
export function setDd(val){
  dd = val
}
export function getDd(){
  return dd
}
export let navMo = today.getMonth() + 1; // 月
export let navYy = today.getFullYear(); // 年

// 节流函数的上一个时间戳
export let lastTimestamp = null
// 选日期的时候  *******  用于获取slideshow的tbody对象
export let slideshowObj = document.getElementsByClassName('slideshow')[0]
// 选月份的时候  *******  用于获取nav下的tbody对象
export let navShowObj = document.getElementsByClassName('navshow')[0]
// 控制导航栏是否显示
export let navObj = document.getElementsByClassName('nav')[0]
// 工具栏左侧的的日期对象
export let toolLeftOBJ = document.getElementsByClassName("toolLeft")[0];

/**
 * 日历初始化函数
 * @param {Boolean} drag 判断是否开启拖拽 true为开启 flase为关闭
 */
export function init(drag = true) {
  showTitle();
  showTools();
  showContent(yy, mo, '');
  // 是否开启日历拖拽功能
  if (drag) dragCalendar()
}
init()

