// 不借助临时变量，进行两个整数的交换
// 利用 a = (a + b) - a  => a = b 即交换成功
function swap(a, b) {
  b = b - a;
  a = a + b;
  b = a - b;
  console.log([a, b]);
  return [a, b];
}

// 或者如下(同理)
function swap2(a, b) {
  a = a - b;
  b = a + b;
  a = b - a;
  console.log([a, b]);
  return [a, b];
}
swap2(9, 3);
