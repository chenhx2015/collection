// 函数柯里化的一些应用
// 其实是把接受多个参数的函数转变成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术（其实就是高阶函数的特殊用法）

// 好处：1.参数复用，调用方便 2.提前确认  3.延迟运行
// 例子1：
function add(x, y) {
  return x + y;
}

function curryingAdd(x) {
  return function(y) {
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
  var _args = Array.prototype.slice.call(arguments);

  var _adder = function() {
    _args.push(...arguments);
    return _adder;
  };
  _adder.toString = function() {
    return _args.reduce(function(a, b) {
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
