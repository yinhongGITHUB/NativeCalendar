/**
 * 点击工具栏左侧事，移除上一个nav
 */
import {
  navShowObj
} from '../js/index.js'
import {
  restoreBottomUp
} from './carouselAnimation.js'
export function removeNav() {
  navShowObj.style.transition = ''
  restoreBottomUp()
  navShowObj.innerHTML = ''
}