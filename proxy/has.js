// has 方法用来拦截 HasProperty 操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符
// has 方法可以接受两个参数，分别是目标对象、需查询的属性名

// 例子一：使用 has 方法隐藏某些属性，不被in运算符发现
var handler = {
  has(target, propKey) {
    if (propKey[0] === "_") {
      return false;
    }
    return propKey in target; // 会返回 true / false
  },
};

var target = { _prop: "foo", prop: "foo" };
var proxy = new Proxy(target, handler);
"_prop" in proxy; // false
"prop" in proxy; // true

// 例子二：如果原对象不可配置或者禁止扩展，这时 has 拦截会报错
var obj = { a: 10 };
Object.preventExtensions(obj);

var p = new Proxy(obj, {
  has(target, propKey) {
    return false;
  },
});
"a" in p; // TypeError: 'has' on proxy: trap returned falsish for property 'a' but the proxy target is not extensible

// 👏👏👏
// 值得注意的是，has方法拦截的是 HasProperty 操作，而不是 HasOwnProperty 操作，即 has 方法不判断一个属性是对象自身的属性，还是继承的属性
// 另外，虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效
