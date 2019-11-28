// 使用 call, apply 实现继承
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.say = function say() {
    console.log("i am ", name);
  };
}

function Student(name, age) {
  Person.call(this, name, age);
}

function Teacher(name, age) {
  Person.apply(this, [name, age]);
}

var per = new Person("张无忌", 24);
per.say();
var stu = new Student("赵敏");
stu.say();
var teacher = new Teacher("周芷若");
teacher.say();
