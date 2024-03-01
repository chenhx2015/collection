// 手动实现一个 bind
Function.prototype.myBind = function(context = window) {
  let fn = this // 调用bind的函数
  let args = [...arguments].slice(1); // myBind 的参数
  let bind = function() {
    let args1 = [...arguments].slice(); // bind 的参数，取 bind 的全部的参数
    // 绑定的函数可能有返回值，所以添加return
    return fn.apply(context, args.concat(args1))
  }
  return bind;
}

function sayName(name = 'chx', age = 18) {
  this.name = name;
  this.age = age;
  return this;
}

let obj = {
  name: 'chx',
  age: 18
}

let mb = sayName.myBind(obj);
let a = mb(); // { name: 'chx', age: 18 }
let b = mb('ttz', 6) // { name: 'ttz', age: 6 } 
