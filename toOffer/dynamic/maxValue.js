// 礼物的最大价值 🌿🌿🌿
// 在一个 m * n 的棋盘的每一格都放有一个礼物，
// 每个礼物都有一定的价值（价值大于 0）。
// 你可以从棋盘的左上角开始拿格子里的礼物，
// 并每次向右或者向下移动一格、直到到达棋盘的右下角。
// 给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

// 示例 1:
// 输入: 
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// 输出: 12
// 解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物

// 方法一：
/**
 * @param {number[][]} grid
 * @return {number}
 */
// 动态规划
// 时间复杂度：O(mn)
// 空间复杂度：O(1)
var maxValue = function(grid) {
  let m = grid.length; // 行
  let n = grid[0].length; // 列
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      if(i === 0 && j === 0) {
        continue;
      } else if(i === 0) {
        grid[i][j] += grid[i][j-1]; // 都是与前面一个相加
      } else if(j === 0) {
        grid[i][j] += grid[i-1][j]; // 都是与前面一个相加
      } else {
        grid[i][j] += Math.max(grid[i-1][j], grid[i][j-1]);
      }
    }
  }
  return grid[m-1][n-1]; // 返回最后累积的那个数 已经处理好了是最大值
};

// test
let grid = [
    [1,3,1],
    [1,5,1],
    [4,2,1]
  ]
console.log('maxValue', maxValue(grid)); // 12

// 方法二：
/**
 * @param {number[][]} grid
 * @return {number}
 */
// 动态规划_优化
// 时间复杂度：O(mn)
// 空间复杂度：O(1)
var maxValue = function(grid) {
  let m = grid.length;
  let n = grid[0].length;
  // 初始化第一行
  for(let j=1; j<n; j++) {
    grid[0][j] += grid[0][j-1];
  }
  // 初始化第一列
  for(let i=1; i<m; i++) {
    grid[i][0] += grid[i-1][0];
  }
  for(let i=1; i<m; i++) {
    for(let j=1; j<n; j++) {
        grid[i][j] += Math.max(grid[i-1][j], grid[i][j-1]);
    }
  }
  return grid[m-1][n-1];
};

