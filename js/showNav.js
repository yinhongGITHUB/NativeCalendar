/**
 * 展示navigation区域
 * @param {String} flag flag有'年' '月'两个选择，分别对应不同的代码逻辑
 * @param {String} currentYear 判断是不是当前的年
 */
import {
  navObj,
  navShowObj,
  getYy,
  setYy,
  getMo,
  setMo,
  navMo,
  navYy,
  toolLeftOBJ,
  slideshowObj
} from '../js/index.js'
import {
  restoreBottomUp
} from '../common/carouselAnimation.js'
import {
  showContent
} from './showContent.js'
import {
  removeCnt
} from '../common/removeCnt.js'
import {
  removeNav
} from '../common/removeNav.js'
export function showNav(flag, order) {
  navObj.style.display = ''
  let cnt = document.getElementsByClassName("content")[0]
  let navshow = document.getElementsByClassName("navshow")[0]
  cnt.style.display = "none"
  navShowObj.style.bottom = 0 + 'px'
  // windows日历固定四行
  let rows = 4;
  // windows日历固定四列
  let cells = 4;
  let tbody = document.createElement('tbody')
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cells; j++) {
      let td = document.createElement("td");
      let year = Number((getYy() + "").substr(0, 3) + (i === 0 ? '0' : i === 1 ? j + 1 : i === 2 ? j + 5 : i === 3 ? 9 : ''))
      if (flag === '月') { // 说明当前是选月
        if (j + i * 4 + 1 > 12) {
          td.innerHTML = j + i * 4 + 1 - 12 + "月";
          td.className = "gray";
        } else if (j + i * 4 + 1 === navMo && getYy() == navYy) {
          // 当前月给样式
          td.innerHTML = j + i * 4 + 1 + "月";
          td.className = " currentCls";
        } else {
          td.innerHTML = j + i * 4 + 1 + "月";
        }
      } else if (flag === '年') { // 说明当前是选年
        if (i === 0 && j < 3) { // 开头灰色的年
          td.innerHTML = year + j - 3
          td.className = "gray";
        } else if (i === 3 && j > 0) { // 末尾灰色的年
          td.innerHTML = year + j
          td.className = "gray";
        } else if (year === navYy) { // 当前的年
          td.innerHTML = navYy;
          td.className = " currentCls";
        } else { // 正常的年
          td.innerHTML = year
        }
      }
      td.className += " navCls";
      td.onmousemove = function (e) { // 鼠标进入时加边框
        e.target.className += " moveBoder"
      }
      td.onmouseleave = function (e) { // 鼠标离开时移除样式
        let cls = e.target.className
        e.target.className = cls.substr(0, cls.indexOf(' moveBoder'))
      }
      td.onclick = function (e) { // 鼠标点击当前导航
        let navTitle = e.target.innerHTML // 当前点击导航的文本  也就是  是几月是几几年
        let len = navTitle.length
        if (len === 4) { // 说明当前点的是年
          setYy(navTitle)
        } else if (navTitle[len - 1] === '月') { // 说明当前点的月
          setMo(Number(navTitle.substr(0, len - 1)))
        }
        toolLeftOBJ.innerHTML = navTitle + (len === 4 ? '年' : '')
        let content = len === 4 ? '年' : '月'
        if (content === '年') { // 如果当前点击的导航的文本显示的是年，那就应该显示月的导航了
          console.log("进来了？");
          removeNav()
          showNav('月')
        } else if (content === '月') { // 如果当前点击的导航的文本显示的是月，那说明要展示日了
          toolLeftOBJ.innerHTML = getYy() + "年" + getMo() + "月";
          navObj.style.display = 'none'
          // 显示日期而且得把里面存在的tbody移除掉
          document.getElementsByClassName("slideHeight")[0].style.display = ""
          cnt.style.display = ""
          //每次切换显示之前先清空
          removeCnt(slideshowObj)
          showContent(getYy(), getMo(), '');
        }
        // 只要导航被点击，不论是年导航还是月导航，清空样式bottom
        restoreBottomUp()
      }
      tr.appendChild(td);
    }
    tbody.id = toolLeftOBJ.innerHTML
    tbody.appendChild(tr);
  }
  navshow.append(tbody)
  if (order === 'up') {
    let tbodyObj = navshow.getElementsByTagName('tbody')[0]
    navshow.insertBefore(tbody, tbodyObj)
  } else {
    navshow.append(tbody)
  }
}