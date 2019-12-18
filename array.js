// 扩展运算符（将一个数组转为用逗号分隔的参数序列）的应用
// (1)复制数组
//（2）合并数组
//（3）与解构赋值结合
//（4）字符串
//（5）实现了 Iterator 接口的对象
//（6）Map 和 Set 结构，Generator 函数
// (7) 替代函数的 apply 方法

// 任何定义了遍历器接口的对象，都可以用扩展运算符转为真正的数组
// 现在数字类型的原型上部署 iterator 接口
Number.prototype[Symbol.iterator] = function*() {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
};
// console.log([...11]);
let num0 = 16;
// console.log([...num0]);
console.log(Array.from(num0));

const go = function*() {
  yield 1;
  yield 2;
  yield 3;
};
console.log([...go()]); // [1, 2, 3]

// 测试 Array.from
let arr2 = [1, 2, 3, 4];
let arr3 = Array.from(arr2);
let arr4 = Array.of(arr2); // Array.of方法用于将一组值，转换为数组
arr3.push(6);
arr4.push(7);
console.log("arr2", arr2); // [1, 2, 3, 4]
console.log("arr3", arr3); // [1, 2, 3, 4, 6]
console.log("arr4", arr4); // [ [ 1, 2, 3, 4 ], 7 ]
// 说明Array.from 是返回一个新数组，不影响原数组

// 数组的其他方法 es6 新增
// 数组实例的 copyWithin() : 会修改当前数组
// 数组实例的 find() 和 findIndex()
// 数组实例的 fill() : 会修改原数组，非深拷贝
// 数组实例的 entries()，keys() 和 values() ：返回的都是遍历器对象，可供 for...of 消费
// 数组实例的 includes()
// 数组实例的 flat()，flatMap() : 返回新数组，并且是一维的，不影响原来的数组 --> 多维数组去重可以配合这个使用
// 数组的空位(以上这些 es6 的方法，ES6 则是明确将空位转为undefined，以下对空位的处理方法如下)
// forEach(), filter(), reduce(), every() 和some()都会跳过空位
// map()会跳过空位，但会保留这个值
// join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串

for (var elem of ["a", "b"].entries()) {
  console.log(elem);
}
// [ 0, 'a' ]
// [ 1, 'b' ]
// 注意：此处用 let 和 var 是一样的输出

let arr5 = Array(3, 2); // [3, 2]  不少于两个时，才会返回由参数组成的新数组
// let arr5 = Array(3); // [, , ,]
console.log("arr5", arr5);

let arr6 = [1, undefined, 3, null, 5];
console.log("arr6", arr6.toString()); // 1,,3,,5  join和toString处理的，undefined null会被视为空

var list = ["Delta", "alpha", "CHARLIE", "bravo"];
var mapped = list.map(function(el, i) {
  return { index: i, value: el.toLowerCase() };
});
console.log("mapped1", mapped);
mapped.sort(function(a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});
console.log("mapped2", mapped);
var result = mapped.map(function(el) {
  return list[el.index];
});
console.log("result", result);

// 若 a 小于 b，即 a - b 小于零，则返回一个小于零的值，数组将按照升序排列。

// 若 a 等于 b，则返回 0。

// 若 a 大于 b, 即 a - b 大于零，则返回一个大于零的值，数组将按照降序排列
