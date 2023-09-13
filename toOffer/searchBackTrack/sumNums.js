// 求 1+2+...+n ，
// 要求不能使用乘除法、for、while、if、else、switch、case
// 等关键字及条件判断语句（A?B:C）。

// 因为不能使用乘法除法，所以不能用等差数列求和的公式

// 方法一：递归和短路原理
var sumNums = function(n) {
  return n && sumNums(n-1) + n;
};

// 方法二：数组索引相加 reduce原理上还是循环，严格来说 不符合题意
var sumNums2 = function(n) {
  let arr = new Array(n);
  arr.fill(0);
  let sum = arr.reduce(function(cal,cur,index){
      return cal + index;
  },n);
  return sum;
  // 一行代码解决
  // return new Array(n).fill(0).reduce((sum,c,index)=>sum+index,n);
};

// 方法三：幂运算 加 位移
// 🤔️ 这个不是很清楚？
var sumNums3 = function (n) {
  // return (n ** 2 + n) >> 1;
  return (Math.pow(n,2) + n) >>1
};