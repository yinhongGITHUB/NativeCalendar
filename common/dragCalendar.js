// 日历支持拖动
export function dragCalendar() {
  let box = document.getElementById("box");
  box.onmousedown = function (e1) {
    let mouseX = e1.clientX - box.offsetLeft;
    let mouseY = e1.clientY - box.offsetTop;
    document.onmousemove = function (e) {
      box.style.left = e.clientX - mouseX + "px";
      box.style.top = e.clientY - mouseY + "px";
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}
