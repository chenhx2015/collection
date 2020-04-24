// 注意，如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。
const obj = {};
Object.defineProperty(obj, "foo", {
  value: "bar",
  writable: false,
});

const handler = {
  set: function (obj, prop, value, receiver) {
    obj[prop] = "baz";
  },
};

const proxy = new Proxy(obj, handler);
proxy.foo = "baz";
proxy.foo; // "bar"
