// 解决 toFixed() 方法四舍五入的问题，偶入奇不入
// num 表示需要四舍五入的小数
// s 表示需要保留几位小数
function toFixed(num, s) {
  var times = Math.pow(10, s); // 表示 10 的s次幂
  var des = num * times + 0.5;
  des = parseInt(des) / times;
  return des + "";
}
let a = 1.125;
let b = toFixed(a, 2);
// let b = toFixed(a);
console.log("b", b);
