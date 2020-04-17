// 高阶函数定义：高阶函数是一个接收函数作为参数传递 或者 将函数作为返回值输出的函数
// JS 中内置的一些高阶函数：
// 1. Array.prototype.map
// 2. Array.prototype.filter
// 3. Array.prototype.reduce

// map() 不改变原数组 & 不会对空数组进行检测 👏
// 语法：array.map(function(item,index,arr), thisValue) 👏
// 例子一：
// 不使用高阶函数：
const arr1 = [1, 2, 3, 4];
const arr2 = [];
for (let i = 0; i < arr1.length; i++) {
  arr2.push(arr1[i] * 2);
}
console.log({ arr2 }); // [ 2, 4, 6, 8 ]
console.log({ arr1 }); // [ 1, 2, 3, 4 ]

// 使用高阶函数
const arr3 = [1, 2, 3, 4];
const arr4 = arr3.map(item => item * 2);
console.log({ arr4 }); // [ 2, 4, 6, 8 ]

// filter() 不改变原数组，符合条件的返回，没有则返回空数组
// 例子一：数组去重
let arr5 = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
const arr6 = [];
for (let i = 0; i < arr5.length; i++) {
  if (arr5.indexOf(arr5[i]) === i) {
    arr6.push(arr5[i]);
  }
}
console.log({ arr6 }); // [ 1, 2, 3, 5, 4 ]
console.log({ arr5 }); // [ 1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4 ]

// 使用高阶函数
const arr7 = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
const arr8 = arr7.filter((item, index, arr) => {
  return arr.indexOf(item) === index;
});
console.log({ arr8 }); // [ 1, 2, 3, 5, 4 ]
console.log({ arr7 }); // [ 1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4 ]

// reduce() 具体请看📒，此处先不做记录
// 关于输出一个函数，比如函数柯里化 add() 函数的实现
