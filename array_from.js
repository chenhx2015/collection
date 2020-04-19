// Array.from 的一些常用用法
// 1.生成数字范围
// 生成一个数组，从 0 开始到 end - 1
function range(end) {
  return Array.from({ length: end }, (_, index) => index);
}
let result1 = range(6);
console.log({ result1 }); // [ 0, 1, 2, 3, 4, 5 ]

// 2. 数组去重: Array.from(new Set(array))

// 3. Array.from(arguments) 将类数组对象 arguments 转换成一个数组
