// Proxy 实例也可以作为其他对象的原型对象
var proxy = new Proxy(
  {},
  {
    get: function (target, propKey) {
      return 35;
    },
  }
);
let obj = Object.create(proxy);
obj.time; // 35
// 上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截
