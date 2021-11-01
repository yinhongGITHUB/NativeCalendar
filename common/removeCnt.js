/**
 * 点击工具栏左侧事，移除上一个nav
 */
import {
    slideshowObj
} from '../js/index.js'
import {
    restoreBottomUp
} from './carouselAnimation.js'
export function removeCnt(showObj) {
    restoreBottomUp()
    showObj.style.bottom = 0 + 'px'
    slideshowObj.innerHTML = ''
}