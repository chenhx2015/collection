// 原型链继承
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.myName = function() {
  console.log("原型链myName:", this.name);
};

function Student(name, age, grade) {
  // Person.call(this, name, age);
  Person.apply(this, [name, age]);
  this.grade = grade;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.myGrade = function() {
  console.log("student prototype grade", this.grade);
};

var stu = new Student("chen", 27, 4);
stu.myName();
stu.myGrade();
