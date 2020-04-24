// getPrototypeOf 方法主要用来拦截获取对象原型
// 具体来说，拦截下面这些操作:
// 1. Object.prototype.__proto__
// 2. Object.prototype.isPrototypeOf()
// 3. Object.getPrototypeOf()
// 4. Reflect.getPrototypeOf()
// 5. instanceof

let proto = {};
let p = new Proxy(
  {},
  {
    getPrototypeOf(target) {
      return proto;
    },
  }
);
Object.getPrototypeOf(p) === proto; // true
// 注意： 1. getPrototypeOf 方法的返回值必须是对象或者 null，否则报错
// 2. 另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf 方法必须返回目标对象的原型对象
