function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  // return funcs.reduce((a, b) => (...args) => a(b(...args)))
  // a 是上次循环的结果，b 是数组当前元素
  // 以下是转换成 ES5 的写法
  return funcs.reduce((a, b) => {
    return function(...args) {
      return a(b(...args));
    };
  });
}
let fn1 = (a, b) => {
  return a + b;
};
let fn2 = a => {
  return a * 10;
};

let result = compose(fn2, fn1); // 生成组合函数
let result2 = result(2, 5); // 调用最后生成的组合函数
console.log("result", result);
// function (...args) {
//   return a(b(...args));
// }
console.log("result2", result2); // 70
