// 全局变量初始化
let today = new Date();
let yy = today.getFullYear(); // 年
let mo = today.getMonth() + 1; // 月
let dd = today.getDate(); // 日
let navMo = mo,
  navYy = yy
let bottomUp = 0,
  count = 0
// 展示title区域
function showTitle() {
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
    lunarCalendar.get(mo) +
    "月" +
    solarCalendar.get(dd) +
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
    yy = Number(str.substr(0, 4))
    mo = Number(str.substr(5, 2))
    showTools()
    removeTbody()
    showContent(yy, mo);
  }
  setTimeout("showTitle()", 1000);
}
showTitle();

// 展示tools区域
function showTools() {
  // 获取tools的各个对象
  let toolLeftOBJ = document.getElementsByClassName("toolLeft")[0];
  let toolRight1OBJ = document.getElementsByClassName("toolRight1")[0];
  let toolRight2OBJ = document.getElementsByClassName("toolRight2")[0];
  //   tools左侧初始化
  toolLeftOBJ.innerHTML = yy + "年" + mo + "月";
  //   tools左侧点击事件
  toolLeftOBJ.onclick = function () {
    let str = toolLeftOBJ.innerHTML;
    if (str[str.length - 1] === "月") { // 说明这里是选月的导航
      toolLeftOBJ.innerHTML = yy + "年";
      document.getElementsByClassName("content")[0].style.display = "none"
      showNav('月');
    } else if (str[str.length - 1] === "年") { // 说明这里是选年的导航
      toolLeftOBJ.innerHTML =
        (yy + "").substr(0, 3) + 0 + "-" + (yy + "").substr(0, 3) + 9;
      showNav('年');
    }
  };

  // 绑定点击事件
  let slideObj = document.getElementsByClassName('slideshow')[0]
  toolRight1OBJ.onclick = function () {
    let str = toolLeftOBJ.innerHTML;
    // 这里我要判断当前是选日还是选月还是选年
    if (str[str.length - 1] === "月") { // 说明这里是选日的
      if (mo > 1) {
        mo -= 1;
      } else {
        mo = 12;
        yy -= 1;
      }
      showContent(yy, mo, 'up');
      removeTbody('up')
      bottomUp = 0
      let TimeID = setInterval(() => {
        bottomUp -= 2
        count += 2
        slideObj.style.bottom = bottomUp + 'px'
        if (count > 276) {
          clearInterval(TimeID)
          count = 0
        }
      }, 1);
    } else if (str[str.length - 1] === "年") { // 说明这里是选月的

    } else { // 说明这里是选年的
      yy -= 8
      showNav('年')
    }

  };
  toolRight2OBJ.onclick = function () {
    let str = toolLeftOBJ.innerHTML;
    // 这里我要判断当前是选日还是选月还是选年
    if (str[str.length - 1] === "月") { // 说明这里是选日的
      if (mo < 12) {
        mo += 1;
      } else {
        mo = 1;
        yy += 1;
      }
      showContent(yy, mo);
      removeTbody()
      bottomUp = -278
      let TimeID = setInterval(() => {
        bottomUp += 2
        count += 2
        slideObj.style.bottom = bottomUp + 'px'
        if (count > 276) {
          clearInterval(TimeID)
          count = 0
        }

      }, 1);
    } else if (str[str.length - 1] === "年") { // 说明这里是选月的

    } else { // 说明这里是选年的
      yy += 8
      showNav('年')
    }

  };

}
showTools();

// 展示content区域
function showContent(y, m, order) {
  // 每次进来，根据传入的年月，生成对应的工具栏
  yy = y
  mo = m
  showTools();
  // 每次日历更新，都是新建一个tbody
  let cnt = document.createElement("tbody");
  cnt.style.display = ""
  document.getElementsByClassName("nav")[0].style.display = 'none'
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
  let slideshowObj = document.getElementsByClassName('slideshow')[0]
  if (order === 'up') {
    let tbodyObj = document.getElementsByTagName('tbody')[0]
    slideshowObj.insertBefore(cnt, tbodyObj)
  } else {
    slideshowObj.appendChild(cnt);
  }

}
showContent(yy, mo);




// 展示navigation区域
function showNav(flag) { // 如果flag存在，说明现在应该显示年了
  let nav = document.getElementsByClassName("nav")[0];
  nav.tBodies[0].innerHTML = "";
  nav.style.display = ''
  document.getElementsByClassName("content")[0].style.display = "none"
  // windows日历固定四行
  let rows = 4;
  // windows日历固定四列
  let cells = 4;
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cells; j++) {
      let td = document.createElement("td");
      let year = Number((yy + "").substr(0, 3) + (i === 0 ? '0' : i === 1 ? j + 1 : i === 2 ? j + 5 : i === 3 ? 9 : ''))

      if (flag === '月') {
        if (j + i * 4 + 1 > 12) {
          td.innerHTML = j + i * 4 + 1 - 12 + "月";
          td.className = "gray";
        } else if (j + i * 4 + 1 === navMo && yy == navYy) {
          // 当前月给样式
          td.innerHTML = j + i * 4 + 1 + "月";
          td.className = "currentCls";
        } else {
          td.innerHTML = j + i * 4 + 1 + "月";
        }
      } else if (flag === '年') {
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
        let toolLeftOBJ = document.getElementsByClassName("toolLeft")[0];
        let nav = document.getElementsByClassName("nav")[0];
        let navTitle = e.target.innerHTML // 当前点击导航的文本  也就是  是几月是几几年
        let len = navTitle.length
        if (len === 4) { // 说明当前点的是年
          yy = navTitle
        } else if (navTitle[len - 1] === '月') { // 说明当前点的月
          mo = Number(navTitle.substr(0, len - 1))
        }
        toolLeftOBJ.innerHTML = navTitle + (len === 4 ? '年' : '')
        let flag = len === 4 ? '年' : '月'
        if (flag === '年') { // 如果当前点击的导航的文本显示的是年，那就应该显示月的导航了
          showNav('月')
        } else if (flag === '月') { // 如果当前点击的导航的文本显示的是月，那说明要展示日了
          toolLeftOBJ.innerHTML = yy + "年" + mo + "月";
          nav.style.display = 'none'
          // 显示日期而且得把里面存在的tbody移除掉
          document.getElementsByClassName("content")[0].style.display = ""
          removeTbody()
          showContent(yy, mo);
        }

      }
      tr.appendChild(td);
    }
    nav.tBodies[0].appendChild(tr);
  }
}

// 移除上一个tbody
function removeTbody(order) {
  let cnt = document.getElementsByTagName('tbody')
  if (order) {
    cnt[cnt.length - 1].remove()
  } else {
    cnt.length > 3 ? cnt[0].remove() : ''
  }
}