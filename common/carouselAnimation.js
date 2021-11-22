/**
 * 上下轮播动画函数
 * @param {String} flag 判断此时是选年（navYear）还是选月（navMonth）还是选日（cnt）
 * @param {Object} params 
 */
import {
  getYy,
  getMo,
  toolLeftOBJ,
} from '../js/index.js'
import {
  showContent
} from '../js/showContent.js'
import {
  showNav
} from '../js/showNav.js'
let bottomUp = 0
export function restoreBottomUp() {
  bottomUp = 0
}
export function carouselAnimation(flag, params) {
  let newArr = [],
    year = (getYy() + "").substr(0, 3) + 0 + "-" + (getYy() + "").substr(0, 3) + 9;
  for (let i = 0; i < params.showObj.childNodes.length; i++) {
    newArr.push(params.showObj.childNodes[i].id)
  }
  if (flag === 'cnt') {
    toolLeftOBJ.innerHTML = getYy() + "年" + getMo() + "月";
  } else if (flag === 'navMonth') {
    toolLeftOBJ.innerHTML = getYy() + "年";
  } else if (flag === 'navYear') {
    toolLeftOBJ.innerHTML = year;
  }

  let whether = !newArr.includes(toolLeftOBJ.innerHTML)
  if (whether) {
    switch (flag) {
      case 'cnt':
        showContent(getYy(), getMo(), params.action)
        break;
      case 'navMonth':
        showNav('月', params.action)
        break;
      case 'navYear':
        showNav('年', params.action)
        break;
      default:
        break;
    }
  }
  // css3的写法
  // 获取当前的bottom====>带单位的
  let bottom = getComputedStyle(params.showObj).bottom
  // 去单位
  bottomUp = Number(bottom.substr(0, bottom.length - 2))
  if (params.action === 'down' && whether) {
    //说明此时的情况是  在下面添加  同时向上滚
    // 1.先退一步，再往前走
    params.showObj.style.bottom = -(params.bottomUp) + 'px'
    setTimeout(() => {
      // 2.动态给css3属性
      params.showObj.style.transition = 'bottom 1s'
      params.showObj.style.bottom = 0 + 'px'
    }, 1);
    params.showObj.addEventListener("transitionend", () => {
      // 3.动画结束后 再把css3属性去除，（利用无transition属性时，给bottom时那一瞬间的页面变化，骗过人类的眼睛）
      params.showObj.style.transition = ''
    }, false)
  } else {
    params.showObj.style.transition = 'bottom 1s'
    bottomUp += params.bottomUp
    params.showObj.style.bottom = bottomUp + 'px'
  }
}