// get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身
let person = {
  name: "张三",
};
let proxy = new Proxy(person, {
  get: function (target, propKey, receiver) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError('Prop name "' + propKey + '" does not exist.');
    }
  },
});
console.log(proxy.name); // 张三
console.log(proxy.age); // ReferenceError: Prop name "age" does not exist.

// get 方法可以继承
let proto = new Proxy(
  {},
  {
    get(target, propKey, receiver) {
      console.log("GET " + propKey);
      return target[propKey];
    },
  }
);
let obj = Object.create(proto);
obj.foo; // GET foo
