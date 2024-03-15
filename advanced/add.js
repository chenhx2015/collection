//  实现以下功能 🌿🌿🌿
// add(1); 	     // 1
// add(1)(2);  	 // 3
// add(1)(2)(3); // 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6
// add(1, 2, 3); // 6

function add() {
  let _args = Array.prototype.slice.call(arguments); // arrayLike to Array
  // 也可以使用 Array.from(arguments)
  // Array.from() 是浅拷贝 返回一个新的数组
  
  // adder 方法本身用来收集各种参数
  let _adder = function() {
    _args.push(...arguments);
    return _adder;
  };

  // 收集完参数的同时 有计算就会隐式执行 toString 方法
  _adder.toString = function() {
    return _args.reduce((total, cur) => {
      return total + cur;
    })
  };

  return _adder;
}

let r1 = add(1); 	     // 1
let r2 = add(1)(2);  	 // 3
let r3 = add(1)(2)(3); // 6
let r4 = add(1)(2, 3); // 6
let r5 = add(1, 2)(3); // 6
let r6 = add(1, 2, 3); // 6
console.log('add result:', +r1, +r2, +r3, +r4, +r5, +r6)
