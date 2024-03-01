// 如何实现 Object.assign() ?
function myAssign(target, ...objs){
  if(target === null || target === undefined){
    throw new TypeError("can not convert null or undefined to object")
  }
  let res = Object(target)
  objs.forEach(obj => {
    'use strict'
    if(obj != null && obj != undefined){
      for(let key in obj){
        // Reflect.ownKeys(obj)确实可以一次性获得 obj 的自身可枚举属性，
        // 但是这些属性除了数组索引之外，也包含数组长度，
        // 这会导致将源对象的数组长度作为目标对象的数组长度，但实际上，两者长度不一定相等
        // 比如，Objetc.myAssign([1,2,3],[8,9]) 的结果将不是期望得到的 [8,9,3]，
        // 而是 [8,9]，因为目标对象的长度被覆盖了。
        if(Object.prototype.hasOwnProperty.call(obj, key)){
          // 借用 Object 原型的 hasOwnProperty 方法，最保险，因为源对象可能会重写 hasOwnProperty 方法
          // 另一方面 它可能是基于 Object.create(null) 构建的，这样的对象不会从Object原型上继承 hasOwnProperty 方法
          res[key] = obj[key]
        }
      }
    }
  })
  return res
}
// 注意：如果是通过 Object.myAssign() 的方式添加的方法是可以枚举的
// 所以此处用 defineProperty 的方式
Object.defineProperty(Object, 'myAssign', {
  value: myAssign,
  writable: true,
  configurable: true,
  enumerable: false
})

// 补充知识点：
// Object.assign() 的基本用法
// 要实现 Object.assign()，首先了解它的大概用法：
// 接受的第一个参数表示目标对象（浅拷贝的结果），如果是 null 或者 undefined，直接报错；
// 如果是对象字面量或者数组，直接使用；如果是基本类型，则装箱为对应的对象。

// 如果只接受了第一个参数，则将其包装为对象直接返回；
// 如果不止接受了第一个参数，比如说接受了第二，第三 …… 等多个参数，那么这些参数表示源对象，
// 它们的自身可枚举属性会一一添加到目标对象上，属性同名则以靠后的对象为准，进行属性覆盖。

// 第一个参数往后的参数，如果是 null 或者 undefined，那么直接跳过；
// 其余的情况则尝试找出它们的可枚举属性，但实际上，只有字符串、数组、对象字面量这些类型是具有可枚举属性的。