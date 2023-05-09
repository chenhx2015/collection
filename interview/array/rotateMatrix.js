// 旋转矩阵
// 给定一个 n × n 的二维矩阵表示一个图像。
// 将图像顺时针旋转 90 度。
// 说明：你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

// 例子：
let matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

// 原地旋转，输入矩阵，使其变为如下
// matrix = [
//   [7, 4, 1],
//   [8, 5, 2],
//   [9, 6, 3],
// ]

function rotateMatrix(matrix) {
  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix.length; j++) {
      let temp = matrix[i].shift();
      matrix[j].push(temp);
    }
  }
  for(let k = 0; k < matrix.length; k++) {
    matrix[k] = matrix.reverse();
  }
  return matrix;
}

console.log('rotateMatrix', rotateMatrix(matrix1));

// 方法二： 🤔️这个没看懂
function rotateMatrix2(matrix) {
  if(matrix === null) {
    return
  }
  let n = matrix.length;
  for(let i = 0 ; i< n / 2; i++) {
    for(let j = i; j < n - 1 - i; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[n - 1 - j][i];
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
      matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
      matrix[j][n - 1 - i] = temp;
    }
  }
  return matrix;
}

console.log('rotateMatrix2', rotateMatrix2(matrix1));
