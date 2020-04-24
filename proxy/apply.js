// apply 方法拦截函数的调用、call 和 apply 操作
// apply 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组
var handlerDemo = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments);
  },
};

// 例子一：
let target = () => {
  return "I am the target";
};
let handler = {
  apply() {
    return "I am the proxy";
  },
};

let p = new Proxy(target, handler);
p(); // I am the proxy

// 例子二：
let twiceHandler = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  },
};
function sum(left, right) {
  return left + right;
}
let proxy = new Proxy(sum, twiceHandler);
proxy(1, 2); // 6
proxy.call(null, 5, 6); // 22
proxy.apply(null, [7, 8]); // 30

// 另外，直接调用Reflect.apply方法，也会被拦截
console.log(Reflect.apply(proxy, null, [9, 10])); // 38
