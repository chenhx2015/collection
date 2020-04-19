// 实现一个简单的 new 方法
// 先要知道 new 方法发生了什么
// new 的过程中会先创建一个空对象，此对象会继承构造器的原型和原型上的属性，最后会被作为实例返回

// 先理清楚 new 关键字调用函数都的具体过程，那么写出来就很清楚了
// 1. 首先创建一个空的对象
// 2. 空对象的__proto__属性指向构造函数的原型对象 fn.prototype,来实现继承
// 3. 改变 this 的指向，执行构造函数、传递参数,fn.apply(obj,) 或者 fn.call()
// 4. 返回新的对象 obj

let Person = function (name, age) {
  this.name = name;
  this.age = age;
};
Person.prototype.sayName = function () {
  console.log(this.name);
};
// 自己定义的 new 方法
let _new = function (fn, ...rest) {
  const obj = {}; // 传建一个新的对象
  obj.__proto__ = fn.prototype; // 把obj的__proto__指向fn的prototype,实现继承
  fn.apply(obj, rest); // 改变 this 的指向
  return Object.prototype.toString.call(obj) == "[object Object]" ? obj : {}; // 返回新的对象 obj
  // 由此得到：箭头函数不能使用 new 创建对象，因为箭头函数没有 prototype 对象和 this
};

// 测试1
let person1 = _new(Person, "chx");
person1.sayName(); // chx
console.log(person1 instanceof Person); // true
