/**
 * 展示content区域
 * @param {Number} y 需要渲染的年
 * @param {Number} m 需要渲染的月
 * @param {String} order 向上渲染还是向下渲染
 */
import {
    showTools
} from './showTools.js'
import {
    navObj,
    today,
    slideshowObj,
    toolLeftOBJ
} from './index.js'
export function showContent(y, m, order) {

    // 每次进来，根据传入的年月，生成对应的工具栏
    showTools();
    // 每次日历更新，都是新建一个tbody
    let cnt = document.createElement("tbody");
    cnt.id = toolLeftOBJ.innerHTML
    cnt.style.display = ""
    navObj.style.display = 'none'
    //根据当前需要显示的年和月来创建日历
    //创建一个要显示的年月的下一个的日期对象
    var date1 = new Date(y, m, 1, 0, 0, 0);
    //对下一个月的1号0时0分0秒的时间 - 1得到要显示的年月的最后一天的时间
    var date2 = new Date(date1.getTime() - 1);
    //得到要显示的年月的总天数
    var showMonthDays = date2.getDate();
    date2.setDate(1);
    //获取要显示的年月的1日的星期,从0开始的星期
    //showMonthWeek表示这个月的1日的星期，也可以作为表格中前面空白的单元格的个数
    var showMonthWeek = date2.getDay(); // 5
    if (showMonthWeek === 0) showMonthWeek = 7;
    var cells = 7;
    var rows = 6; // 由于windows上面的日历始终显示7行，所以固定为6

    // 这里要那当前显示月份的上一个月有多少天，以及拿当前显示月份的下一月有多少天
    var datePre = new Date(y, m - 1, 0, 0, 0, 0);
    // 前面需要补 showMonthWeek - 1 个
    var datePreDates = showMonthWeek - 1;

    var dateNext = new Date(y, m + 1, 0, 0, 0, 0);
    // 后面需要补 showMonthWeek - 1 + showMonthDays 个
    var dateNextDates = showMonthWeek - 1 + showMonthDays;

    //通过上面计算出来的行和列生成表格
    //每生成一行就生成7列
    //行的循环
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        //列的循环
        for (var j = 0; j < cells; j++) {
            var td = document.createElement("td");
            var span = document.createElement("span");
            span.innerHTML = i * cells + j - (showMonthWeek - 2); // 从0开始的，所以应该减二
            var v = i * cells + j - (showMonthWeek - 2);
            //根据这个月的日期控制显示的数字
            if (v > 0 && v <= showMonthDays) {
                //高亮显示今天的日期
                if (
                    today.getFullYear() == y &&
                    today.getMonth() == m - 1 &&
                    today.getDate() == v
                ) {
                    td.className = "today";
                    td.flag = true; // 标记一下今天的日期
                    span.className = "todayBorder";
                }

                td.appendChild(span);
            } else if (v <= 0) {
                // 这里是在补前面空缺的
                v += datePre.getDate();
                span.innerHTML = v;
                span.className = "gray";
                td.appendChild(span);
            } else if (v > showMonthDays) {
                // 这里是在补后面空缺的
                v -= showMonthDays;
                span.innerHTML = v;
                span.className = "gray";
                td.appendChild(span);
            }
            // 绑定点击事件
            td.onclick = function (e) {
                //   排他处理
                for (var i = 0; i < e.path[3].children.length; i++) {
                    var temp = e.path[3].children[i];
                    for (var j = 0; j < temp.children.length; j++) {
                        temp.children[j].className = "";
                        if (temp.children[j].flag) {
                            temp.children[j].children[0].className = "";
                            // 说明点击的是当前的日期的td
                            temp.children[j].className = "today";
                        }
                    }
                }
                //   当前项的td标签加被选中状态
                e.path[1].className = "selected";
                if (e.path[1].flag) {
                    // 说明点击的是当前的日期td
                    e.path[1].className = "today";
                    e.path[1].children[0].className = "todayBorder";
                }

                // 这里是让footer跟随点击完成数据绑定
            };
            tr.appendChild(td);
        }

        cnt.appendChild(tr);
    }
    if (order === 'up') {
        let tbodyObj = document.getElementsByTagName('tbody')[0]
        slideshowObj.insertBefore(cnt, tbodyObj)
    } else {
        slideshowObj.appendChild(cnt);
    }
}