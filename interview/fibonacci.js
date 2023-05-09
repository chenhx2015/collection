// 看题目是否说了从0项开始
// 从第0项开始： 0， 1， 1， 2， 3， ，，，
// 从第1项开始： 1， 1， 2， 3， ，，，，

// 题目：用js实现斐波那契数列函数，返回第n个斐波那契数，f(1) = 1, f(2) = 1 等。
function fibonacci(n) {
  if(n === 1 || n === 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}

// 题目：要求输入一个整数 n，请你输出斐波那契数列的第 n 项 （从0开始，第0项为0， 第一项是1）
function fibonacci2(n) {
  if (n === 0 || n === 1 || n === 2) {
    return 1
  }
  return fibonacci2(n - 2) + fibonacci2(n - 1);
}

console.log('fibonacci2', fibonacci2(4)); // 3