// 二维数组中的查找 🌿🌿🌿
// 在一个 n * m 的二维数组中，每一行都按照从左到右 非递减 的顺序排序，
// 每一列都按照从上到下 非递减 的顺序排序。请完成一个高效的函数，
// 输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

// 示例:
// 现有矩阵 matrix 如下：
let m = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
// 给定 target = 5，返回 true。
// 给定 target = 20，返回 false。

function findNumberIn2DArray(matrix, num) {
  let m = matrix.flat(Infinity);
  return m.includes(num);
}

console.log(findNumberIn2DArray(m, 20)); // false

function findNumberIn2DArray2(matrix, target) {
  if(matrix.length == 0 || matrix[0].length == 0){
    return false;
  }
  let x = 0;
  let y = matrix[0].length - 1;
  // 注意这里的判断条件 
  // 因为后面 y是往左移动，所以要保证是y>=0
  // x 是往下移动，也就是往后，所以要保证 x < matrix.length
  while(x < matrix.length && y >= 0){ 
    let num = matrix[x][y];
    if(num == target){
      return true;
    }else if(num > target){
      y--;
    }else{
      x++;
    }
  }
  return false;
}

console.log(findNumberIn2DArray2(m, 5)); // true
