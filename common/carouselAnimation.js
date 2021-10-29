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
let bottomUp = 0,
  count = 0
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
  if (params.action === 'down' && whether) { // down的时候，给他初始值 up的时候不给初始值
    bottomUp += params.bottomUp
  }
  let TimeID = setInterval(() => {
    if (params.action === 'up') {
      bottomUp -= 2
    } else if (params.action === 'down') {
      bottomUp += 2
    }
    count += 2
    params.showObj.style.bottom = bottomUp + 'px'
    if (count >= params.time) {
      clearInterval(TimeID)
      count = 0
    }
  }, 1);
}