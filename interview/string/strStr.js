// 实现 strStr() 🌿🌿🌿
// 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回 -1。当 needle 是空字符串时我们应当返回 0 。

// 示例一：
// 输入: haystack = “hello”, needle = “ll”
// 输出: 2

// 示例二：
// 输入: haystack = “aaaaa”, needle = “bba”
// 输出: -1

// 题意:
// 1、如果needle是空字符串应返回0.
// 2、如果needle字符串在haystack字符串里返回第一次出现的位置。
// 3、如果needle字符串不在haystack字符串里应返回-1.

// 方法一：
function strStr(haystack, needle) {
  return needle === '' ? 0 : haystack.indexOf(needle);
}

// 方法二：
function strStr2(haystack, needle) {
  if (needle === "") {
      return 0;
  };
  for (var i = 0; i < haystack.length; i++) {
      if (haystack[i] === needle[0]) {
          if (haystack.substring(i, i + needle.length) === needle) {
              return i;
          };
      };
  };
  return -1
};

// 方法三：正则
function strStr3(haystack, needle) {
  var regex = new RegExp(needle, 'g');
  var matchResult = regex.exec(haystack);
  return matchResult ? matchResult['index'] : -1;
};
