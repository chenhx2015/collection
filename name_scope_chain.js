// 作用域相关
for (var i = 0; i < 5; i++) {
  console.log(i);
}
// 0 1 2 3 4

// --------------------------------------
for (let i = 0; i < 3; i++) {
  console.log(i);
}
// 0 1 2

// --------------------------------------
var foo = true;
if (foo) {
  var bar = foo * 2;
  console.log(bar);
}
// 2
console.log("bar", bar); // 2 事实证明这个 var 声明的变量 bar 是属于外部作用域的,如果是 let声明的则是局部的作用域

// --------------------------------------
for (var j = 0; j < 3; j++) {
  console.log(j); // 0 1 2
}
console.log("j", j); // 3 事实证明for循环里面 var 声明的标识符,作用于也属于外部作用于，如果是 let声明的则是局部的作用域, 和 if 块的一样

// --------------------------------------
// 立即执行函数
(function test() {
  var name = "chen";
  (function inner() {
    var name = "lee";
    // name = "lee";  // 两个打印结果都是“lee”
    console.log("innerName", name);
  })();
  console.log("outName", name);
})();

// innerName lee
// outName chen

// --------------------------------------
// Null，数组，日期，正则都有属于自己的类型。而typeof都返回最顶端的object类型
console.log("type-null:", typeof null); // object
console.log("type-undefined:", typeof undefined); // undefined

// --------------------------------------
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log("timer", i);
  }, i * 1000);
}
// 每秒输出一个6，总的输出5个6

// --------------------------------------
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log("timer", i);
  }, i * 1000);
}
// 每秒输出一个数，从1到5
