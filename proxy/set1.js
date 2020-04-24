// 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写

const handler = {
  get(target, propKey, receiver) {
    invariant(propKey, "get");
    return target[propKey];
  },
  set(target, propKey, value, receiver) {
    invariant(propKey, "set");
    target[propKey] = value;
    // 严格模式下，set代理返回false或者undefined，都会报错
    return true; // 注意，严格模式下，set代理如果没有返回true，就会报错 --> TypeError
  },
};

function invariant(key, action) {
  if (key[0] === "_") {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

const target = {};
const proxy = new Proxy(target, handler);
// 私有属性不可以 set get
// 只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的
proxy._prop; // Error: Invalid attempt to get private "_prop" property
proxy._prop = "c"; // Error: Invalid attempt to set private "_prop" property

proxy.a = "hello";
console.log(proxy.a); // hello
