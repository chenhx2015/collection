// 拷贝，深拷贝和浅拷贝
// 1.ES6实现浅拷贝的方法
// 对象
var a = { name: "樱花🌸" };
var b = Object.assign({}, a);
b.age = 18;
console.log("a", a);
console.log("b", b);
// a { name: '樱花🌸' }
// b { name: '樱花🌸', age: 18 }

// 2.数组（原理：数组的三个方法都不会改变原数组 slice, concat, join）
var a2 = [1, 2, 3];
var b2 = a2.concat();
b2.push(4);
console.log("a2", a2); // [1, 2, 3]
console.log("b2", b2); // [1, 2, 3, 4] 不影响原数组

// 3.数组slice
var a3 = [1, 2, 3];
var b3 = a3.slice();
b3.push(99);
console.log("a3", a3); // [1, 2, 3]
console.log("b3", b3); // [1, 2, 3, 99]

// 4.数组，扩展运算符
var a4 = [1, 2, 3];
var b4 = [...a4];
b4.push(12);
console.log("a4", a4); // [1, 2, 3]
console.log("b4", b4); // [1, 2, 3, 12]

// 5.深拷贝
function deepCopy(p, c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === "object") {
      c[i] = p[i].constructor === Array ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}
var objA = { key1: "11111" };
objA.key2 = ["薛宝钗", "林黛玉"];
var objB = {};
objB = deepCopy(objA, objB);
objB.key2.push("刘姥姥");
console.log("objA", objA);
console.log("objB", objB);
// objA { key1: '11111', key2: [ '薛宝钗', '林黛玉' ] }
// objB { key1: '11111', key2: [ '薛宝钗', '林黛玉', '刘姥姥' ] }
