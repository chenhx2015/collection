// 找出数组中最大值和最小值
// 方法一：
// Math.max.apply(null, arr) 和 Math.min.apply(null, arr)
let max1 = Math.max.apply(null, [12, 13, 1]);
console.log(max1); // 13

// 多维数组求最值 ***
function maxAndMin(arr) {
  return {
    max: Math.max.apply(null, arr.join(",").split(",")),
    min: Math.min.apply(null, arr.join(",").split(","))
  };
}
let arr2 = [
  [12, 14],
  [9, 4]
];
let max2 = maxAndMin(arr2);
console.log(max2); // { max: 14, min: 4 }

// 方法二：直接用扩展运算符
let arr3 = [19, 3, 7];
let max3 = Math.max(...arr3);
console.log("arr3", max3); // 19

// 方法三：使用 sort，然后取出第一个和最后一个。 原理如下：注意其返回值
// 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
// 若 a 等于 b，则返回 0。
// 若 a 大于 b，则返回一个大于 0 的值
let arr4 = [22, 13, 6, 55, 30];
arr4.sort(function(a, b) {
  return a - b; // 从小到大排序
});
// 不改变原数组的三个方法：concat, slice, join
console.log("arr4 order", arr4);

let oarr = [
  [1, 4],
  [9, 5]
];
// join() 方法用于把数组中的所有元素放入一个字符串。返回的是个字符串
console.log(Math.max.apply(null, oarr.join(",").split(",")));
console.log(oarr.join(",").split(",")); // [ '1', '4', '9', '5' ] 二位数组变为了一维数组

let parr = [
  [1, [2, 4]],
  [1, 7],
  [9, [9, 3, [23]]]
];
console.log(parr.join(",").split(","));
// [ '1', '2', '4', '1', '7', '9', '9', '3', '23' ]
// 对位数组变为一维数组
