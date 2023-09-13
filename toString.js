class Fruit{
  constructor(a, b) {
      this.a = a;
      this.b = b;
  }
  // 两者的区别
  // valueOf方法返回对象的原始值
  // toString方法将对象转换为字符串并返回字符串。

  valueOf() {
    // 可以改写，改写之后会按照自定义的方式输出，加减运算都可以
    // 外部要使用这个对象（类实例）的值的时候
    return this.a + this.b + 'sshshshshsh';
  }

  toString() {
    return this.a + this.b
  }
  
}

let fruit = new Fruit('apple', 10);
console.log('fruit', fruit); // Fruit { a: 'apple', b: 10 }
// 注意下面一行：一定是有计算之后才会转成字符串输出，否则就是上面一行这种
// 四则运算之后，如果两者类型不一样 就会进行强制类型转换
console.log('fruit', fruit + 10); // apple1010
// 注意：会优先找 valueOf() ，没有的话 再找 toString()

