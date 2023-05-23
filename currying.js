// 函数柯里化的一些应用
// 其实是把接受多个参数的函数转变成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术（其实就是高阶函数的特殊用法）

// 好处：1.参数复用，调用方便 2.提前确认  3.延迟运行
// 例子1：
function add(x, y) {
  return x + y;
}

function curryingAdd(x) {
  return function (y) {
    return x + y;
  };
}
add(1, 2);
curryingAdd(1)(2);

// 例子2:
// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
function adder() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = Array.prototype.slice.call(arguments);
  // 在内部声明一个函数，利用闭包的特性保存 _args 并收集所有的参数值
  var _adder = function () {
    _args.push(...arguments);
    return _adder;
  };

  // 利用 toString 隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  };

  return _adder;
}
let result = adder(1)(2)(3);
console.log(result);
console.log("result", result); // 6
let result2 = adder(1, 2, 3)(4);
console.log("result2", result2); // 10

// 补充一下知识点 & 原理
// Array.prototype.slice.call(arguments);
// 这行代码首先是会将 参数 绑定到数组的 slice 方法，这样就可以使用slice方法了
// slice 内部实现是将起始位置用for循环截取出来，再push进数组 来实现截取的功能 最后返回的是数组

// 类数组转数组的方法有三种
// 1.Array.prototype.slice.call(arrayLike); // 或者 Array.prototype.splice.call(arrayLike, 0);
// 2.[].slice.call(arrayLike);
// 3.一个一个参数 for 循环 push 进去数组 再返回这个数组
// 4.es6 ： Array.from(arrayLike);
// 5.Array.prototype.concat.apply([], arrayLike);