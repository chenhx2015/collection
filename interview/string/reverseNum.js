// 整数反转
// 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
// 如果反转后整数超过 32 位的有符号整数的范围 [−231, 231 − 1] ，就返回 0。
// 假设环境不允许存储 64 位整数（有符号或无符号）。

// 示例 1：
// 输入：x = 123
// 输出：321

// 示例 2：
// 输入：x = -123
// 输出：-321

// 示例 3：
// 输入：x = 120
// 输出：21

// 示例 4：
// 输入：x = 0
// 输出：0

// 将 x 从 Number 对象转成 String 对象，用 String 对象的方法 split 将 String 分割成 Array ，然后用 Array 对象的 reverse 方法进行翻转，再用 Array 对象的 join 方法将 Array 转成 String，最后用 parseInt 将 String 变回 Number。
// 因为分割成字符数组的原因，最后一步处理的 String 在 x<0 时会失去结尾的负号，所以 x<0 时结果加负号。
// 最后 return 时用三目进行判断，以满足题目要求。

function reverseNum(x) {
  let y = parseInt(x.toString().split('').reverse().join(''));
  if(y < 0) y = - y;
  return y > 2147483647 || y < -2147483648 ? 0 : y;
}

console.log('reverseNum', reverseNum(-123)); // 321
console.log('reverseNum2', reverseNum(123)); // 321
console.log('reverseNum3', reverseNum(0)); // 0

// 方法二：
// 用数学的方法来解决这道题。我们对数字依次取模，就可以得到倒序的结果了
// 假设数字num = 20001128，result = 0

// num % 10 = 8, result = 8，num = (num / 10) | 0 也就是2000112
// num % 10 = 2, result = 8*10 + 2也就是82， num = (num / 10) |0 也就是200011
// 依次往下计算，最终可以得到结果，最后的结果reuslt | 0如果不等于reuslt, 说明超出了范围，返回0。
// 这里的 | 0 就很妙，表示取整，超过32位的整数转换结果不等于自身，就可以用来判断是否溢出了。

function reverseNum2(x) {
  let result = 0;
  while(x !==0) {
    result = result * 10 + x % 10;
    x = (x / 10) | 0;
  }
  return (result | 0) === result ? result : 0;
}

console.log('reverseNum21', reverseNum(-123)); // 321
console.log('reverseNum22', reverseNum(123)); // 321
console.log('reverseNum23', reverseNum(0)); // 0
