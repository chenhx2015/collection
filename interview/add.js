// 请实现一个 add 函数，满足以下功能 ----- @todo 待修改
// add(1); // 1
// add(1)(2); // 3
// add(1)(2)(3); // 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6
// add(1, 2, 3); // 6

function add() {
  let _args = Array.prototype.slice.call(arguments);
  let _adder = function () {
    _args.push(...arguments);
    return _adder;
  };
  _adder.toString = () => {
    return _args.reduce((prev, cur) => {
      return prev + cur;
    });
  };
  return _adder;
}
let result1 = add(1, 2, 3)(4);
// 下面两种形式输出结果值
console.log("result1", result1); // 10
// console.log(result1.toString()); // 10
