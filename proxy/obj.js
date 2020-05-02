console.log(Object.is(undefined, null)); // false

Object.is("foo", "foo"); // true
// Object.is(window, window); // true

Object.is("foo", "bar"); // false
Object.is([], []); // false

var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo); // true
Object.is(foo, bar); // false

Object.is(null, null); // true

// 特例
Object.is(0, -0); // false
Object.is(0, +0); // true
Object.is(-0, -0); // true
Object.is(NaN, 0 / 0); // true
console.log(Object.is(-0, +0)); // false

// === 运算符（和== 运算符）将数字值 -0 和 +0 视为相等，并认为 Number.NaN 不等于 NaN
