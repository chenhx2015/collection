// 设计模式，简单掌握三种设计模式
// 工厂模式
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  };
  return o;
}
var person1 = createPerson("taotao", 2, "child");
console.log("person1", person1);

// 构造函数模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  };
}
var person2 = new Person("taotao", 2, "kindergarten child");
console.log("person2", person2);

// 原型模式
function somePerson() {}
somePerson.prototype.name = "taotao";
somePerson.prototype.age = 2;
somePerson.sayName = function() {
  console.log(this.name);
};
var person3 = new Person();
var person4 = new Person();

// 注意，如果查属性和方法，会先找自己的，找不到再去原型上找
