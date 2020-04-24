// defineProperty 方法拦截了 Object.defineProperty 操作
var handler = {
  defineProperty(target, propKey, descriptor) {
    return false;
  },
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = "bar"; // 不会生效

// 注意
// 1. 如果目标对象不可扩展（non-extensible），则 defineProperty 不能增加目标对象上不存在的属性，否则会报错
// 2. 另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则 defineProperty 方法不得改变这两个设置
