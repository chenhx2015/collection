// 原型链
var anotherObject = {
  a: 2
};
var myObject = Object.create(anotherObject);
var value = myObject.a;
console.log(value);

// 2 Object.create原理：它会创建一个对象，并把这个对象的 [[prototype]] 关联到指定的对象

// 注意其原型链及本身是否有这个属性
console.log("hasOwnProperty", anotherObject.hasOwnProperty("a")); // true
console.log("hasOwnProperty", myObject.hasOwnProperty("a")); // false(

for (var key in anotherObject) {
  console.log("another-key:", key); // a
}

for (var key in myObject) {
  console.log("myObject-key:", key); // a
}

// 总结，myObject 对象本身没有属性 a, 但是原型链上面有
