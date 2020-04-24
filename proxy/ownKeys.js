// ownKeys 方法用来拦截对象自身属性的读取操作 --> 自身属性
// 具体来说，拦截以下操作
// Object.getOwnPropertyNames()
// Object.getOwnPropertySymbols()
// Object.keys()
// for...in 循环

// 例子一：
let target = {
  a: 1,
  b: 2,
  c: 3,
};

let handler = {
  ownKeys(target) {
    return ["a"];
  },
};

let proxy = new Proxy(target, handler);
let result = Object.keys(proxy);
console.log({ result }); // [ 'a' ] 只返回里面的 a 属性

// 例子二：拦截第一个字符为下划线的属性名
let target2 = {
  _bar: "foo",
  _prop: "bar",
  prop: "baz",
};

let handler2 = {
  ownKeys(target) {
    return Reflect.ownKeys(target).filter((key) => key[0] !== "_");
  },
};
let proxy2 = new Proxy(target2, handler2);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"

// 例子三：
// 注意，使用Object.keys方法时，有三类属性会被 ownKeys 方法自动过滤，不会返回
// 目标对象上不存在的属性
// 属性名为 Symbol 值
// 不可遍历（enumerable）的属性
let target3 = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for("secret")]: "4",
};
Object.defineProperty(target, "key", {
  enumerable: false,
  configurable: true,
  writable: true,
  value: "static",
});
let handler3 = {
  ownKeys(target) {
    return ["a", "d", Symbol.for("secret"), "key"];
  },
};
let proxy3 = new Proxy(target3, handler3);
Object.keys(proxy3); // [ 'a' ]

// 例子四：
// ownKeys 方法还可以拦截 Object.getOwnPropertyNames()
var p = new Proxy(
  {},
  {
    ownKeys: function (target) {
      return ["a", "b", "c"];
    },
  }
);

Object.getOwnPropertyNames(p);
// [ 'a', 'b', 'c' ]

// 例子五：for...in循环也受到 ownKeys 方法的拦截
let target5 = {
  hello: "world",
};
let proxy5 = new Proxy(target5, {
  ownKeys(target) {
    return ["a", "b"];
  },
});
for (const key in proxy5) {
  console.log({ key }); // 没有任何输出
  // ownkeys 指定只返回 a 和 b 属性，由于 target5 没有这两个属性
}

// 注意：ownKeys 方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错
var obj = {};

var p = new Proxy(obj, {
  ownKeys: function (target) {
    return [123, true, undefined, null, {}, []];
  },
});

Object.getOwnPropertyNames(p);
// Uncaught TypeError: 123 is not a valid property name
// 上面代码中，ownKeys 方法虽然返回一个数组，但是每一个数组成员都不是字符串或 Symbol 值，因此就报错了

// 注意：如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回，否则报错
// 例子六：
var obj6 = {};
Object.defineProperty(obj6, "a", {
  configurable: false,
  enumerable: true,
  value: 10,
});

var p6 = new Proxy(obj6, {
  ownKeys: function (target) {
    return ["b"];
  },
});

Object.getOwnPropertyNames(p6);
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
// obj 对象的 a 属性是不可配置的，这时 ownKeys 方法返回的数组之中，必须包含 a，否则会报错。

// 例子七：
// 另外，如果目标对象是不可扩展的（non-extensible），这时ownKeys方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错
var obj7 = {
  a: 1,
};

Object.preventExtensions(obj7);

var p7 = new Proxy(obj7, {
  ownKeys: function (target) {
    return ["a", "b"];
  },
});

Object.getOwnPropertyNames(p7);
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
// 上面代码中，obj 对象是不可扩展的，这时 ownKeys 方法返回的数组之中，包含了 obj 对象的多余属性 b，所以导致了报错
