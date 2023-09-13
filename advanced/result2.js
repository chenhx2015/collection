// a 在什么情况下会打印出1
// 考察隐式类型转换
// var a = ?;
// if(a == 1 && a == 2 && a == 3){
//   console.log(1);
// }

// 方法一：重写 valueOf 方法
var a = {num:0};
a.valueOf = function(){
  return ++a.num
}
if(a == 1 && a == 2 && a == 3){
  console.log(1);
}

// 方法二：重写 toString
let a = {
  i: 1,
  toString () {
    return a.i++
  }
}
if(a == 1 && a == 2 && a == 3){
  console.log(1);
}