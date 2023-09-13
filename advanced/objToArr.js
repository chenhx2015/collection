// 某公司 1 到 12 月份的销售额存在一个对象里面
// 如下：{1:222, 2:123, 5:888}
// 请把数据处理为如下结构：
// [222, 123, null, null, 888, null, null, null, null, null, null, null]。

function objToArr(obj) {
  let arr = new Array(12).fill(null);
  for( [key, value] of Object.entries(obj)) {
    arr[key - 1] = value // @todo 看看还有没有其他方式
  }
  return arr;
}
let obj = {1:222, 2:123, 5:888};
console.log('objToArr', objToArr(obj));