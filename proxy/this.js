// 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理
const target = {
  m: function () {
    console.log(this === proxy);
  },
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m(); // false
proxy.m(); // true

// 例子一：
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
// 上面代码中，getDate 方法只能在 Date 对象实例上面拿到，如果 this 不是 Date 对象实例就会报错
// 解决方案：this 绑定原始对象，就可以解决这个问题
const target = new Date("2015-01-01");
const handler = {
  get(target, prop) {
    if (prop === "getDate") {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  },
};
const proxy = new Proxy(target, handler);

proxy.getDate(); // 1
