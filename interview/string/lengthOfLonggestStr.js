// 问题扩展
// 给定一个字符串s，找出其中不含有重复字符的‘最长’子串的长度
// ‘abcabcbb’ =》 3 因为无重复字符的最长子串是 abc 所以长度为3
// ‘bbbbb’ =》 1

function lengthOfLongestSubString(s) {
  let left = 0;
  let right = 1;
  let str;
  let max = 1;
  while(right < s.length) {
    str = s.slice(left, right);
    if(str.indexOf(s.charAt(right)) > -1) {
      left++;
      continue;
    } else {
      right++;
    }
    max = Math.max(max, right - left);
  }
  return max;
}
