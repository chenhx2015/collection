// preventExtensions 方法拦截 Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值
// 这个方法有一个限制，只有目标对象不可扩展时（即 Object.isExtensible(proxy) 为 false ），proxy.preventExtensions 才能返回 true，否则会报错

// 例子一：
let proxy = new Proxy(
  {},
  {
    preventExtensions(target) {
      return true;
    },
  }
);
Object.preventExtensions(proxy);
// TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible

// 为了防止出现这个问题，通常要在 proxy.preventExtensions 方法里面，调用一次 Object.preventExtensions
let p2 = new Proxy(
  {},
  {
    preventExtensions(target) {
      console.log("called");
      Object.preventExtensions(target);
      return true;
    },
  }
);
console.log(Object.preventExtensions(p2));
// called
// {}
