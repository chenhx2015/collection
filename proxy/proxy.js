// Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程
// Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

// 使用 proxy 实现一个数据响应式
// let p = new Proxy(target, handle)
// 1. new Proxy() 表示生成一个 Proxy 实例
// 2. target 参数表示所要拦截的目标对象
// 3. handler 参数也是一个对象，用来定制拦截行为

// 在修改proxy代理对象时，一般也需要同步到代理的目标对象上，这个同步就是用 Reflect 对应方法来完成的

// 定义一个监听函数
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, key, receiver) {
      getLogger(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      setBind(value, key);
      return Reflect.set(target, key, value);
    },
  };
  return new Proxy(obj, handler);
};
let obj = { a: 1 };
let p = onWatch(
  obj,
  (v, key) => {
    console.log("监听到属性" + key + "改变为" + v);
  },
  (target, key) => {
    console.log(`'${key}' = ${target[key]}`);
  }
);
p.a = 10; // 监听到属性a改变为10
p.a; // 'a' = 10
