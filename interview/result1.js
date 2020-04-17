// 写出结果
function Foo() {
  Foo.a = function() {
    console.log(1);
  };
  this.a = function() {
    console.log(2);
  };
}
// 以上只是 Foo 的构建方法，没有产生实例，此刻也没有执行

Foo.prototype.a = function() {
  console.log(3);
};
Foo.a = function() {
  console.log(4);
};
Foo.a(); // 4
let obj = new Foo();
obj.a(); // 2
Foo.a(); // 1 // 构建方法里已经替换了全局 Foo 上的 a 方法，所以 1
