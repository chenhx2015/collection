// isExtensible 方法拦截 Object.isExtensible 操作
// 👏👏👏 相关知识点：
// Object.isExtensible(obj) 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）
// 请注意：参数必须是个对象，否则将抛出一个 TypeError 异常
// Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）

// 新对象默认是可扩展的.
var empty = {};
Object.isExtensible(empty); // === true

// 可以变得不可扩展.
Object.preventExtensions(empty);
Object.isExtensible(empty); // === false

// 密封对象是不可扩展的.
var sealed = Object.seal({});
Object.isExtensible(sealed); // === false

// 冻结对象也是不可扩展.
var frozen = Object.freeze({});
Object.isExtensible(frozen); // === false

// 👏👏👏 end

let p = new Proxy(
  {},
  {
    isExtensible(target) {
      console.log("called");
      return true;
    },
  }
);
Object.isExtensible(p);
// called
// true

// 注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值
