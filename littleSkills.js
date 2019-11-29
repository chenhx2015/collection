// 一些小技巧
// 1.获取指定范围内的随机数(整数)
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let value1 = getRandomNum(3, 5);
// console.log("value1", value1);

// 2.随机获取数组中的元素
function getRandomFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
let value2 = getRandomFromArr([3, 8, 0]);
console.log("value2", value2);

// 3.打乱数字数组的顺序
function disorganizeArr(arr) {
  arr.sort(function() {
    return Math.random() - 0.5;
  });
  return arr;
}
let value3 = [1, 2, 3, 4];
let result3 = disorganizeArr(value3);
console.log("result3", result3);

// 4.类似数组的对象（使用数字作为key,并且具有长度属性length,可迭代的）转换为数组
// 四种方法：slice，Array.from(arguments), Array.prototype.concat.apply([], arguments)， Array.prototype.slice.call(arguments, 0)
function objTransferToArr() {
  var obj = {
    0: "qian",
    1: "duan",
    2: "kai",
    3: "fa",
    length: 4
  };
  let objArr = [].slice.call(obj);
  // let objArr = Array.from(obj);
  // let objArr = Array.prototype.concat.apply([], obj);
  // let objArr = Array.prototype.slice.call(obj);
  console.log("objArr", objArr);
}
objTransferToArr();

// 5.验证是否为数组
// 还有其他方法
function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}
let isArr = isArray([1, 4]);
console.log("isArr", isArr); // true

// 6.删除数组的某项 (不要使用delete来直接删除数组中的元素)
var arr6 = [1, 2, 3, 4, 5];
delete arr6[4];
console.log("arr6", arr6); // [1, 2, 3, 4 ,<1 empty item>]
console.log("arr6.length", arr6.length); // 5
// 说明使用delete删除数组中的元素，仅仅是将元素置为空，长度依然为原来的长度

// 7.清空数组
var arr7 = [1, 2, 3, 4, 5];
// 方法一：
arr7.length = 0;
// 方法二：
arr7.splice(0, arr7.length);
// 方法三：直接赋值空数组（严格意义来说，这只是将arr7重新赋值为空数组，之前的数组如果没有引用在指向它将等待垃圾回收）
arr7 = [];
console.log("arr7", arr7);
