import {
    lunarCalendar,
    solarCalendar
} from '../common/utils.js'
import {
    cutContent
} from '../common/cutContent.js'
import {
    showContent
} from './showContent.js'
import {
    setMo,
    setYy,
    toolLeftOBJ
} from './index.js'
// 展示title区域
export function showTitle() {
    let today = new Date();
    let yyTitle = today.getFullYear(); // 年
    let moTitle = today.getMonth() + 1; // 月
    let ddTitle = today.getDate(); // 日
    let hhTitle = today.getHours(); // 时
    let mmTitle = today.getMinutes(); // 分
    let ssTitle = today.getSeconds(); // 秒
    let strTime = t(hhTitle) + ":" + t(mmTitle) + ":" + t(ssTitle);
    let strDate =
        yyTitle +
        "年" +
        moTitle +
        "月" +
        ddTitle +
        "日" +
        lunarCalendar.get(moTitle) +
        "月" +
        solarCalendar.get(ddTitle) +
        "日";

    function t(a) {
        // 数字是个位数的话,前面要加0 十位就不用加
        return a < 10 ? "0" + a : a;
    }
    let titleTimeObj = document.getElementsByClassName("titleTime")[0]
    let titleData = document.getElementsByClassName("titleData")[0]
    titleTimeObj.innerHTML = strTime;
    titleData.innerHTML = strDate;
    titleData.onclick = function (e) {
        let str = e.target.innerHTML
        let currentY = Number(str.substr(0, 4))
        let currentM = Number(str.substr(5, 2))
        setYy(currentY)
        setMo(currentM)
        cutContent()
        showContent(currentY, currentM, '');
        toolLeftOBJ.innerHTML = currentY + '年' + currentM + '月'
    }
    let timeID = setInterval(() => {
        showTitle()
        clearInterval(timeID)
    }, 1000);
}