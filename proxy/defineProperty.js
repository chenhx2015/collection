// Object.defineProperty() 作用：定义对象的属性和赋值
// ECMAScript中有两种属性：数据属性和访问属性
// 有 set, get, value, writable, enumerable, configurable 👏👏👏
// configurable: false , 那么不可以修改, 不可以删除.
// 但 writable : false, 不可以采用 数据运算符 进行赋值

var o = {}; // 创建一个新对象
Object.defineProperty(o, "a", {
  value: "original",
  writable: false, // 这个地方为 false
  enumerable: true,
  configurable: true,
});

o.a = "new"; //此时候, 是更改不了 a 的.

var o = {}; // 创建一个新对象
Object.defineProperty(o, "a", {
  value: "original",
  writable: true,
  enumerable: true,
  configurable: false, //这里为false
});
o.a = "new"; //此时候, a 进行了改变
//但是如果
delete o.a; //将返回 false, 并且 a 没有被删除

// 结论：此刻我们看来, 对于我们的影响, 目前来看, 主要是
// configurable 控制是否可以删除 writable 控制是否可以修改(赋值) 👏👏👏
// 当然 enumerable 控制是否可以枚举. --> 是否会出现在for in 或者 Object.keys()的遍历中

// Object.defineProperty 缺陷：
// 1. 对经过 Object.defineProperty 方法建立的响应式对象来说,无法检测到对象属性的新增或删除, 只能追踪对象已有数据是否被修改
// --> vue hack 响应式对象删除属性，可以使用Vue.delete(obj, propertyName/index)或者vue.$delete(obj, propertyName/index); 类似于删除响应式对象子对象的某个属性，也可以重新给子对象赋值来解决

// 2. 不能监听数组的变化
// --> vue hack : 这也只限制在数组的push/pop/shift/unshift/splice/sort/reverse七个方法

// 优点：
// 1. 兼容性好,支持IE9

// 👏👏👏
// proxy 相关知识点：
// proxy 特点 / 优点
// 1. Proxy直接代理整个对象而非对象属性
// --> 而不是像 Object.defineProperty 针对某个属性。只需做一层代理就可以监听同级结构下的所有属性变化，包括新增属性和删除属性

// 2. Proxy也可以监听数组的变化
// 3. 拦截方式较多
// 4. Proxy返回一个新对象，可以只操作新对象达到目的，而Object.defineProperty只能遍历对象属性直接修改

// 劣势，缺点：
// 1. 兼容性问题，无完全 polyfill --> proxy-polyfill，其实现也是残缺的, 只支持 Proxy 的4个 trap：get、set、apply和 construct & 部分支持的 trap 其功能也是残缺的，如 set 不支持新增属性
// 2. 性能问题 --> Proxy 的性能比 Promise 还差, 这就要需要在性能和简单实用上进行权衡
