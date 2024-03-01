// 手动实现 call 方法
// 基本思想是把fn.call(obj,args)中的fn赋值为obj的属性，然后调用obj.fn即可实现fn中this指向的改变
Function.prototype.myCall = function(context = window) {
  // myCall函数的参数，没有传参默认是指向 window
  // 为对象添加方法（this指向调用myCall的函数）因为this是：谁调用它 它就指向谁
  context.fn = this;
  let args = [...arguments].slice(1); // 剩余的参数
  let res = context.fn(...args);
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
  age: 24,
}
let age = sayName.myCall(obj, 'ttz', 6) // ttz 6

