// 如何实现 Object.assign() 🌿🌿🌿
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
// 只有一级属性的时候 它是深拷贝，有二级以及更多了 就是浅拷贝了
// 要实现 Object.assign()，首先了解它的大概用法：
// 接受的第一个参数表示目标对象（浅拷贝的结果），如果是 null 或者 undefined，直接报错；
// 如果是对象字面量或者数组，直接使用；如果是基本类型，则装箱为对应的对象。

// 如果只接受了第一个参数，则将其包装为对象直接返回；
// 如果不止接受了第一个参数，比如说接受了第二，第三 …… 等多个参数，那么这些参数表示源对象，
// 它们的自身可枚举属性会一一添加到目标对象上，属性同名则以靠后的对象为准，进行属性覆盖。

// 第一个参数往后的参数，如果是 null 或者 undefined，那么直接跳过；
// 其余的情况则尝试找出它们的可枚举属性，但实际上，只有字符串、数组、对象字面量这些类型是具有可枚举属性的。


// 扩展：defineProperty 和 Proxy 的区别
// 1：从效果上讲，表现是一致的

// 2: Object.defineProperty只能劫持对象的属性，而Proxy是直接代理对象。
// 由于 Object.defineProperty 只能对属性进行劫持，需要遍历对象的每个属性，
// 如果属性值也是对象，则需要深度遍历。而 Proxy 直接代理对象，不需要遍历操作。

// 3: Object.defineProperty 劫持的是对象的属性，所以新增属性时，需要重新遍历对象（改变属性不会自动触发setter），
// 对其新增属性再使用 Object.defineProperty 进行劫持

// 4: defineProperty会污染原对象（关键区别）
// proxy去代理了ob，他会返回一个新的代理对象不会对原对象ob进行改动，
// 而 defineproperty 是去修改元对象，修改元对象的属性，而 proxy 只是对元对象进行代理并给出一个新的代理对象。
