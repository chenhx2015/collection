// 不借助临时变量，进行两个整数的交换
// 利用 a = (a + b) - a  => a = b 即交换成功
function swap(a, b) {
  b = b - a;
  a = a + b;
  b = a - b;
  console.log([a, b]);
  return [a, b];
}
swap(9, 3);
