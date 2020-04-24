// 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作
let pipe = function (value) {
  let funcStack = [];
  let proxy = new Proxy(
    {},
    {
      get(target, fnName) {
        if (fnName === "get") {
          return funcStack.reduce((prev, cur) => {
            console.log({ cur });
            return cur(prev);
          }, value);
        }
        funcStack.push(fnName); // ?
        console.log({ funcStack });
        return proxy; // ?
      },
    }
  );
  return proxy;
};

var double = (n) => n * 2;
var pow = (n) => n * n;
var reverseInt = (n) => n.toString().split("").reverse().join("") | 0;

let result = pipe(3).double.pow.reverseInt.get;
console.log({ result });
