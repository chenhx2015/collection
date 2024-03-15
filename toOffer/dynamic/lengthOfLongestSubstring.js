// 最长不含重复字符的子字符串 🌿🌿🌿
// 请从字符串中找出一个最长的不包含重复字符的子字符串，
// 计算该最长子字符串的长度。

// 示例 1:
// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 示例 2:
// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

// 示例 3:
// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
// 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

// 本题采用哈希表 + 滑动窗口的思路
// 哈希表用来存储每个字符出现的次数，当单个字符出现2次的时候，用以辅助我们移动滑动窗口
// 首先定义一个左右指针，左指针和右指针初始时指向0，右指针不断右移作为判断循环的条件，当右指针移动到字符串长度的位置时，结束循环。

var lengthOfLongestSubstring = function (s) {
  // !本题采用滑动窗口 + 哈希表的方法解决
  // 定义滑动窗口，这个滑动窗口是一个哈希表，哈希表的键：单个字符 值：该字符出现的次数
  const window = new Map();
  // 定义左指针
  let left = 0;
  // 定义右指针
  let right = 0;
  // 定义不重复子串的最大长度
  let res = 0;
  // 右指针小于字符串的长度的时候，是进入循环的条件
  // 因为都是往右边移动，所以只需要保证这个条件即可：right < s.length
  while (right < s.length) {
    // 因为我们移动的是右指针，所以要先判断哈希表中是否含有右指针指向的元素
    if (window.has(s[right])) {
      window.set(s[right], window.get(s[right]) + 1);
    } else {
      window.set(s[right],1);
    }
    // 判断右指针指向的元素是否出现重复
    while (window.get(s[right]) > 1) {
      // 左指针指向的元素出现的次数-1，然后左指针右移，直到出现重复的那个元素不再重复
      window.set(s[left], window.get(s[left]) - 1);
      left++;
    }
    right++;
    res = Math.max(res,right - left);
  }
  return res;
};

console.log('test', lengthOfLongestSubstring('abcabcbb')); // 3

// 总结：
// 启示一：学会使用滑动窗口 + 哈希表
// 启示二：学会使用双指针
// 启示三：学会通过更新的方式获取到最大值
