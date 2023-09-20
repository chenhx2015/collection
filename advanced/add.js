//  实现以下功能
// add(1); 	     // 1
// add(1)(2);  	 // 3
// add(1)(2)(3); // 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6
// add(1, 2, 3); // 6

function add() {
  let _args = Array.prototype.slice.call(arguments);
  
  let _adder = function() {
    _args.push(...arguments);
    return _adder;
  };

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
