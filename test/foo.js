// 写结果
function Foo() {
  getName = function() {
    console.log(1);
  };
  return this;
}
Foo.getName = function() {
  console.log(2);
};
Foo.prototype.getName = function() {
  console.log(3);
};
var getName = function() {
  console.log(4);
};
function getName() {
  console.log(5);
}
// 请写出以下输出结果
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2 . 操作符的优先级高于 new ,因此相当于 new (Foo.getName)()
new Foo().getName(); // 3 括号优先级高于 new ,因此相当于 (new Foo()).getName()
new new Foo().getName(); // 3 相当于 new ((new Foo()).getName)();
