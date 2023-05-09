// 跳台阶
// 一只青蛙一次可以跳上1级台阶，也可以跳上二级，求该青蛙跳上一个n级的台阶总共有多少种跳法
// （先后次序不同 算不同的结果）

// 分析：青蛙每次只有一阶或者两阶 两种跳法，那么：
// 假设第一次跳的是一阶，那么剩下的n-1个台阶，跳法是 f(n - 1);
// 假设第一次跳的是两阶，那么剩下的n-2个台阶，跳法是 f(n - 2);
// 由上面两种假设可得： f(n) = f(n-2) + f(n-1);
// 由此得出斐波那契数列

// 方法一: 递归方法实现 （这是最低级的做法，有很多重复计算，效率低）
function jumpFloor(n) {
  if (n <= 2) {
    return n;
  }
  return jumpFloor(n - 2) + jumpFloor(n - 1);
}

// 方法二：动态规划实现（这种方法利用斐波那契数列从下往上算，避免重复计算，提高效率）
function jumpFloor2(n) {
  if(n <= 2) {
    return n;
  }
  let f = 1;
  let g = 1;
  // while (n--) {
  //   g = g + f; // 后一个
  //   f = g - f; // 前一个
  //   console.log("g,f", g,f)
  // }
  // 上面注释部分就是下面这段
  while (n--) {
    let temp = g
    g = g + f; // 后一个
    f = temp; // 前一个
    console.log("g,f", g,f)
  }
  return f;
}
// 1, 1, 2, 3, 5
let n = 4
console.log('jumpFloor', jumpFloor(n), jumpFloor2(n)); // 5 
