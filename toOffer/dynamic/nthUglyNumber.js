// 丑数
// 我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。
// 求按从小到大的顺序的第 n 个丑数。

// 示例:
// 输入: n = 10
// 输出: 12
// 解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。

// 思路：
// 我们得到的丑数一定是之前的丑数的 2、3 、5倍,
// 并且当前位置要得到丑数只是取其中最小的那个.
// 因此我们定义三个指针p2、p3、p5分别代表
// 当前2、3 、5这些系数所叠加的丑数的索引位置index,
// 也就是说当前该系数所得到的丑数的原始丑数的下标.
// 当我们要获取一个新的丑数的时候,
// 就可以从三个系数以及他们要乘积的元始丑数所得到的三个结果中
// 取最小的那个为新丑数.并将取到的这个系数的指针向前移动,
// 表示该索引位置的元始丑数你已经用过了,而且成功取到了成为新的丑数了.

function nthUglyNumber(n) {
  let dp = new int[n];
  dp[0]=1;
  let p2=0,p3=0,p5=0;
  for(let i = 1; i < n; i++){
    let a = dp[p2]*2,b = dp[p3]*3,c = dp[p5]*5;
    dp[i] = Math.min(a,Math.min(b,c));
    if(dp[i] == a) p2++;
    if(dp[i] == b) p3++;
    if(dp[i] == c) p5++;
  }
  return dp[n-1];
}