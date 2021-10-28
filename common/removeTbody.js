/**
 * 移除上一个tbody
 * @param {String} order 判断向上还是向下的标识字符
 * @param {Array} tbodys tbodys数组
 * @returns 
 * 
 * 这里的* order *只做了up区分，是因为当* order *为down或''时都是走的同一个代码逻辑
 */
export function removeTbody(order, tbodys) {
    if (tbodys.length < 3) return; // 始终保持有两个tbody
    if (order === 'up') {
      tbodys[tbodys.length - 1].remove() // 是因为下面的nav区域还有个tbody，不要动人家的子元素，删除自己的就好了
    } else {
      tbodys[0].remove()
    }
  }