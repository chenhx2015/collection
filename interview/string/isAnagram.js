// 有效的字母异位词
// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
// 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
// 进阶: 如果输入字符串包含 unicode 字符怎么办？

// 示例 1:
// 输入: s = "anagram", t = "nagaram"
// 输出: true

// 示例 2:
// 输入: s = "rat", t = "car"
// 输出: false

// 方法一：先排序再比较
function isAnagram(s, t) {
  if(s.length !== t.length) return false; // 如果长度不相等，则没必要再比较下去
  return s.split('').sort().join('') === t.split('').sort().join('')
}

console.log(isAnagram('abcrty', 'abcrty')); // true
console.log(isAnagram('abcrtop', 'abcrty')); // false

// 方法二：哈希表
// 1. 判断字符串 s 和 t 的长度是否相等；
// 2. 把字符串 s 中的元素及其出现次数存入 map；
// 3. 遍历字符串 t ，不断更新 map 中的值。一旦发现该值为 0 或 undefined ，直接返回 false。

function isAnagram2(s, t) {
  if(s.length !== t.length) return false;
  const map = new Map();
  const len = s.length;
  for(let i = 0; i < len; i++) {
    const val = map.get(s[i]);
    map.set(s[i], val ? val + 1 : 1)
  }
  for(let j = 0; j < len; j++) {
    const val = map.get(t[j]);
    if(val) {
      map.set(t[j], val - 1)
    } else {
      return false;
    }
  }
  return true;
}

console.log(isAnagram2('abcrty', 'abcrty')); // true
console.log(isAnagram2('abcrtop', 'abcrty')); // false

// 方法三：
function isAnagram3(s, t) {
  if(s.length !== t.length) return false;
  const len = s.length;
  const arr = new Array(26).fill(0);
  const code = 'a'.charCodeAt(); // 获取 a 的 ASCII 码
  for(let i = 0; i < len; i++) {
    // 获取每个字母在ASCII码表里面的位置，再为这个位置的数字出现的次数计数
    arr[s[i].charCodeAt() - code]++;
  }
  // 然后在字符串t中进行检索
  for(let j = 0; j < len; j++) {
    if(!arr[t[i].charCodeAt() - code]) return false;
    arr[t[i].charCodeAt() - code]--;
  }
  return true;
}

console.log(isAnagram2('abcrty', 'abcrty')); // true
console.log(isAnagram2('abcrtop', 'abcrty')); // false

