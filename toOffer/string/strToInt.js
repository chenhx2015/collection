// 字符串转为整数 @todo 有点问题
// 只有 - / + / 数字 / 空格 开头的才能正确的转化，其他符号开头的不行
// 如果是空格开头，则把空格去掉,如果是多个0开头，也要去掉
// 注意最大范围和最小范围 2 ** 31 ～ 2**31 - 1

function strToInt(str) {
  // 首先去除空格两端的空格
  str = str.trim();
  let num = str.match(/^(+-)?\d+/)
  if(!num) {
    return 0
  } else {
    num = num[0];
  }
  // 确定数值范围的最大值和最小值
  const min = - (2 ** 31);
  const max = (2 ** 31) - 1;
  // 判断 num 是否超出数值范围
  return num < min ? min : num > max ? max : num
}
console.log('strToInt', strToInt('+123dfw'));