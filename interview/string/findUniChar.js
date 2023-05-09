// 字符串中的第一个唯一字符
// 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

// 方法一：遍历每个字符，记录出现的次数，再找出第一次出现的那个

// 方法二：
/**
 * 字符串中的第一个唯一字符
 * 思路：遍历记数
 * @param {*} str
 */
function firstUniqueChar(str) {
  const map = new Map();
  for (let char of str) {
    map[char] = (map[char] || 0) + 1;
  }
  for (let i = 0; i < str.length; i++) {
    if (map[str[i]] === 1) {
      return i;
    }
  }
  return -1;
}
let str1 = 'letcode';
let str2 = 'loveletcode';
console.log(firstUniqueChar(str1)); // 0
console.log(firstUniqueChar(str2)); // 2

// 方法三：
// 使用 indexOf() === lastIndexOf 判断
