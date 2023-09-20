// 左旋转字符串
// 示例 1：
// 输入: s = "abcdefg", k = 2
// 输出: "cdefgab"

// 示例 2：
// 输入: s = "lrloseumgh", k = 6
// 输出: "umghlrlose"

function reverseLeftWords(s, n) {
  let prev = s.slice(0, n);
  let next = s.slice(n, s.length);
  return `${next}${prev}`;
}

let s = "lrloseumgh";
console.log('reverseLeftWords', reverseLeftWords(s, 6)); // umghlrlose