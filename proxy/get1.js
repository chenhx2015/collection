// 下面的例子使用 get 拦截，实现数组读取负数的索引
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    },
  };
  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}
let arr = createArray("a", "b", "c", "d");
arr[-3]; // b
