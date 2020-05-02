// 拷贝，深拷贝和浅拷贝
// 深拷贝与浅拷贝的概念只存在于引用数据类型
// 如何区分深拷贝与浅拷贝，简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力
// 由此联想到：栈堆，基本数据类型与引用数据类型 👏👏👏
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

// 深拷贝方法二：
// 借用 JSON 对象的 parse 和 stringify
// 但会忽略 undefined、任意的函数、symbol 值
function deepClone(obj) {
  let _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone;
}
let aa = [0, 1, [2, 3], 4],
  bb = deepClone(aa);
aa[0] = 1;
aa[2][0] = 1;
console.log(aa);
console.log(bb);
// [ 1, 1, [ 1, 3 ], 4 ]
// [ 0, 1, [ 2, 3 ], 4 ]
