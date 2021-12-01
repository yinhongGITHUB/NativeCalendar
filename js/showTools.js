import {
  toolLeftOBJ,
  slideshowObj,
  navShowObj,
  setYy,
  getYy,
  setMo,
  getMo,
} from "./index.js";
import { showNav } from "./showNav.js";
import { removeNav } from "../common/removeNav.js";
import { throttle } from "../common/throttle.js";
import { carouselAnimation } from "../common/carouselAnimation.js";
// 展示tools区域
export function showTools() {
  // 获取tools的各个对象
  let toolRight1OBJ = document.getElementsByClassName("toolRight1")[0];
  let toolRight2OBJ = document.getElementsByClassName("toolRight2")[0];
  //   tools左侧初始化
  toolLeftOBJ.innerHTML = getYy() + "年" + getMo() + "月";
  // 每次变化年月之后，都要将变化后的年月暴露出去

  //   tools左侧点击事件
  toolLeftOBJ.onclick = function () {
    let str = toolLeftOBJ.innerHTML;
    if (str[str.length - 1] === "月") {
      // 说明这里是选月的导航
      toolLeftOBJ.innerHTML = getYy() + "年";
      document.getElementsByClassName("slideHeight")[0].style.display = "none";
      removeNav();
      showNav("月");
    } else if (str[str.length - 1] === "年") {
      // 说明这里是选年的导航
      toolLeftOBJ.innerHTML =
        (getYy() + "").substr(0, 3) + 0 + "-" + (getYy() + "").substr(0, 3) + 9;
      removeNav();
      showNav("年");
    }
  };

  // 绑定点击事件
  toolRight1OBJ.onclick = function () {
    if (!throttle(150)) return;
    let str = toolLeftOBJ.innerHTML;
    // 这里我要判断当前是选日还是选月还是选年
    if (str[str.length - 1] === "月") {
      // 说明这里是选日的
      if (getMo() > 1) {
        setMo(getMo() - 1);
      } else {
        setMo(12);
        setYy(getYy() - 1);
      }
      carouselAnimation("cnt", {
        action: "up",
        bottomUp: -276,
        showObj: slideshowObj,
      });
    } else if (str[str.length - 1] === "年") {
      // 说明这里是选月的
      setYy(getYy() - 1);
      carouselAnimation("navMonth", {
        action: "up",
        bottomUp: -304,
        showObj: navShowObj,
      });
    } else {
      // 说明这里是选年的
      setYy(getYy() - 10);
      carouselAnimation("navYear", {
        action: "up",
        bottomUp: -304,
        showObj: navShowObj,
      });
    }
  };
  toolRight2OBJ.onclick = function () {
    if (!throttle(150)) return;
    let str = toolLeftOBJ.innerHTML;
    // 这里我要判断当前是选日还是选月还是选年
    if (str[str.length - 1] === "月") {
      // 说明这里是选日的
      if (getMo() < 12) {
        setMo(getMo() + 1);
      } else {
        setMo(1);
        setYy(getYy() + 1);
      }
      carouselAnimation("cnt", {
        action: "down",
        bottomUp: 276,
        showObj: slideshowObj,
      });
    } else if (str[str.length - 1] === "年") {
      // 说明这里是选月的
      setYy(getYy() + 1);
      carouselAnimation("navMonth", {
        action: "down",
        bottomUp: 304,
        showObj: navShowObj,
      });
    } else {
      // 说明这里是选年的
      setYy(getYy() + 10);
      carouselAnimation("navYear", {
        action: "down",
        bottomUp: 304,
        showObj: navShowObj,
      });
    }
  };
}
