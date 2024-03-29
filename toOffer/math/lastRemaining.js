// 圆圈中最后剩下的数字
// 0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，
// 每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。
// 求出这个圆圈里剩下的最后一个数字。

// 例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，
// 则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。

// 示例 1：
// 输入: n = 5, m = 3
// 输出: 3

// 示例 2：
// 输入: n = 10, m = 17
// 输出: 2

// 解题思路
// 本题属于约瑟夫环问题，属于经典的数学问题
// 解题的核心思路在于：定义一个下标指针，在于下面的这个式子：
// head = （head + m - 1）% arr.length;

var lastRemaining = function(n, m) {
  let arr = []
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  let flag = 0;
  while (arr.length !== 1) {
    flag = (flag + m - 1) % arr.length;
    arr.splice(flag, 1);
  }
  
  return arr[0];
};

// m 是指第几个，不是从0开始的下标，而是实际的第几个
console.log('res', lastRemaining(10, 17)); // 2
console.log('res', lastRemaining(8, 2)); // 3
console.log('res', lastRemaining(10, 3)); // 3