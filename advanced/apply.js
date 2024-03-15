// 手动实现 apply 方法 🌿🌿🌿
Function.prototype.myApply = function(context = window) {
  context.fn = this; // 为对象添加方法（this 指向调用 myCall 的函数）
  let res;
  if(arguments[1]) {
    res = context.fn(...arguments[1]); // 调用该方法，该方法this指向context
  } else {
    res = context.fn();
  }
  delete context.fn // 删除添加的方法
  return res;
}

// test
function sayName(name = 'chx', age = 18) {
  this.name = name;
  this.age = age;
  console.log(this.name);
  console.log(this.age);
  return this.age;
}

let obj = {
  name: 'chx',
  age: 18
}

let age = sayName.myApply(obj, ['ttz', 6]); // ttz 6
