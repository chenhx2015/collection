// 打印结果
// var name = "Tom";
(function() {
  if (typeof name == "undefined") {
    var name = "Jack"; // var
    console.log("Goodbye " + name);
  } else {
    console.log("Hello " + name);
  }
})();
// Hello Tom ×
// Goodbye Jack √
// 因为：IIFE内的var穿透了块作用域，name被提升至if()之前，且此时name为undefined

var name = "Tom";
(function() {
  if (typeof name == "undefined") {
    let name = "Jack"; // let
    console.log("Goodbye " + name);
  } else {
    console.log("Hello " + name);
  }
})();
// Hello Tom

var name = "Tom";
(function() {
  if (typeof name == "undefined") {
    name = "Jack";
    console.log("Goodbye " + name);
  } else {
    console.log("Hello " + name);
  }
})();
// Hello Tom
// 1、首先在进入函数作用域当中，获取name属性
// 2、在当前作用域没有找到name
// 3、通过作用域链找到最外层，得到name属性
// 4、执行else的内容，得到Hello Tom
