// 尝试写一个遍历器
// 下面是一个无限运行的遍历器对象
var it = idMaker();

let a1 = it.next().value; // 0
let a2 = it.next().value; // 1
let a3 = it.next().value; // 2
let a4 = it.next().value; // 3
// ....
console.log("a1", a1); // 0
console.log("a2", a2); // 1
console.log("a3", a3); // 2
console.log("a4", a4); // 3

function idMaker() {
  let index = 0;
  return {
    next: () => {
      return {
        value: index++,
        done: false
      };
    }
  };
}
// 将一个数组添加到另外一个数组的尾部
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
let final0 = [...arr1, ...arr2];
console.log(final0); // 例子1： [ 0, 1, 2, 3, 4, 5 ] 注意扩展运算符的用法
// let finalArr = [arr1, arr2];
// console.log(finalArr); // 例子2： [ [ 0, 1, 2 ], [ 3, 4, 5 ] ] 注意这个结果会变成二维数组
let final2 = arr1.push(...arr2); // 例子3： 记住 push 返回的是数组的长度
console.log(final2, arr1); // 6 [ 0, 1, 2, 3, 4, 5 ]
// 注意这才是变成一维数组的方法
