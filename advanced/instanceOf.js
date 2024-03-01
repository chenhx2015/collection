// 实现 instanceOf 
// 概念：instanceOf 运算符是用来检测某个构造函数的 prototype 属性是否出现在某个实例的原型链上
// 通俗的理解：instanceOf 是个运算符，可以用来判断某一个对象的类型，原理就是利用了原型和原型链
// 基本用法 A instanceOf B // true or false
// 其中 A 是需要判断的类型， B 是构造函数，Object， Function 都可以称之为构造函数

// 和 typeOf 的对比
// typeof：主要用来判断基础数据类型，比如：Number、String 等等。
// instanceof：主要用来判断对象数据类型，比如 Function、Array 等等。
// typeof 直接返回数据类型，而 instanceof 重在判断，它返回布尔值。

// 我们知道 instanceof 其实不仅仅是用来判断数据类型的
// 它实际上是用来判断一个实例对象与一个构造函数之间的关系的

// 那么我们通常如何判断一个实例对象与一个构造函数之间的关系的呢？
// 答案就是利用原型和原型链！我们都知道每一个函数都有一个显式原型 prototype，
// 每一个对象都有一个隐式原型__proto__，
// 当我们对象的原型链中存在构造函数的显式原型 prototype 时，我们就可以确定它们之间时存在关系的。

// 更简单的说法：

// 我们拿到 instanceof 左侧对象的原型链
// 再拿到 instanceof 右侧构造函数的显式原型 prototype
// 如果原型链中存在显式原型 prototype，instanceof 返回 true，否则返回 false

function myInstanceOf(left, right) {
  let rightPrototype = right.prototype; // 获取构造函数的显式原型
  let leftProto = left.__proto__; // 获取实例对象的隐式原型
  while (true) {
    // 说明到原型链顶端，还未找到，返回 false
    if (leftProto === null) {
      return false;
    }
    // 隐式原型与显式原型相等
    if (leftProto === rightPrototype) {
      return true;
    }
    // 获取隐式原型的隐式原型，重新赋值给 leftProto
    leftProto = leftProto.__proto__;
  }
}

// 重点依据如下：
// 每一个对象都有一个__proto__属性指向原型对象的prototype属性，
// 原型对象的__proto__属性也会指向它的原型对象的prototype属性
// 因此，如果实例a是b类型，那么a的原型链上必然有b的prototype属性