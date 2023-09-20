// 替换空格
// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
// 示例 1：
// 输入：s = "We are happy."
// 输出："We%20are%20happy."

function replaceSpace(str) {
  return str.replace(/\s+/g, '%20');
}
let s = "We are happy.";
console.log('replaceSpace:', replaceSpace(s)); // We%20are%20happy