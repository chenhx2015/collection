// isExtensible 方法拦截 Object.isExtensible 操作
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
