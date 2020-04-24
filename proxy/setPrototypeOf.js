// setPrototypeOf 方法主要用来拦截 Object.setPrototypeOf 方法
var handler = {
  setPrototypeOf(target, proto) {
    throw new Error("Changing the prototype is forbidden");
  },
};
let proto = {};
let target = function () {};
let proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto); // // Error: Changing the prototype is forbidden

// 注意：1. 该方法只能返回布尔值，否则转为布尔值
// 2. 如果目标对象不可扩展，setPrototypeOf 方法不得改变目标对象的原型
