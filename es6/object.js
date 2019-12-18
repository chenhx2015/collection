// 对象的扩展
const proto = {
  foo: "hello"
};

const obj = {
  foo: "word",
  find() {
    console.log(super.foo);
    return super.foo; // 注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错
  }
};
Object.setPrototypeOf(obj, proto);
obj.find(); // 'hello

let obj2 = {
  a: 1
};
Object.assign(obj2, undefined);
Object.assign(obj2, null);
console.log("obj2", obj2); // { a: 1 } 和目标对象 obj2 相等（===）

// setPrototypeOf() :用来设置一个对象的 prototype 对象，返回参数对象本身 -- 它是 ES6 正式推荐的设置原型对象的方法
// getProtoTypeOf() ：用于读取一个对象的原型对象

// 例子1
let Person = {
  say() {
    console.log("Person say name...");
  }
};
let Student = {
  name: "lee",
  class: 3,
  grade: 90
};
Object.setPrototypeOf(Student, Person);
Student.say(); // Person say name...

let stuProto = Object.getPrototypeOf(Student);
console.log({ stuProto }); // { stuProto: { say: [Function: say] } }

// 例子2
let proto3 = {};
let obj3 = {
  x: 10
};
Object.setPrototypeOf(obj3, proto3);
proto3.y = 20;
proto3.z = 40;

console.log(obj3.x); // 10
console.log(obj3.y); // 20
console.log(obj3.z); // 40
// 因为实现了原型继承，所以原型上的属性也能继承下来
