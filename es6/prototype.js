// 原型链相关
// class A {}
// class B extends A {}
// console.dir(A);

// console.log(B.__proto__);

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.hi = function() {
  console.log(
    "Hi my name is " + this.name + "i am " + this.age + "years old now"
  );
};

function Student(name, age, className) {
  Person.call(this, name, age);
  this.className = className;
}

Student.prototype = Object.create(Person.prototype);
// Student.prototype.constructor = Student;
var test = new Student("adf", 10, "sdf");
console.log(test instanceof Person);
