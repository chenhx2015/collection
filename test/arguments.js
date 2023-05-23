// Javascrip中每个函数都会有一个Arguments对象实例arguments
// arguments.length为函数实参个数，arguments.callee引用函数自身
(function() {
  console.log(arguments);
  console.log(arguments.length);
  console.log(arguments.callee);
})(1);
// { '0': 1 }
// 1
// [function]

// arguments.callee 与形参是一一映射
// 虽然 arguments 对象并不是一个数组（类数组），但是访问单个参数的方式与访问数组元素的方式相同
// arguments 只在函数内部起作用

// 为了获取除了已定义参数a、b之外的参数，我们不得不用arguments，并且循环要从索引2开始以便排除前两个参数，这种写法很别扭，只是为了获得额外的rest参数，有没有更好的方法

// 再来看看 rest
function foo(a, b, ...rest) {
  console.log("a = " + a);
  console.log("b = " + b);
  console.log(rest);
}

foo(1, 2, 3, 4, 5); // 参数有多的情况
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo(1); // 参数没有填满的情况
// 结果:
// a = 1
// b = undefined
// Aray [] 请注意，这里是个空数组

// 变量提升导致内层变量可能会覆盖外层的变量
var i = 5;
function func() {
  console.log(i);
  if (true) {
    var i = 6;
  }
}
func(); // undefined
