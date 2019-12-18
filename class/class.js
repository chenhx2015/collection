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
