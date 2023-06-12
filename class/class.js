// class 相关的
class Person {
  constructor(...args) {
    this.args = args;
  }
}

class Student extends Person {
  constructor() {
    super();
    console.log("this", this);
  }
}

// 知识点：ES6的继承是需要先创建父类的实例对象this，再通过子类的构造函数去修改this
// ES5 的相反