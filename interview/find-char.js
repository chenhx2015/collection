// 找出字符串中连续出现最多的字符和个数
// 'abcaakjbb' => {'a': 2, 'b':2}
// 'ababkejsbcccwqaa' => {'c':3}
// 请注意：是连续出现的

let str = "abcaakjbb";
// 方法一：
const arr = str.match(/(\w)\1*/g); // 字符串的 match 方法，在字符串内找到匹配的值，返回数组结果值
const maxLen = Math.max(...arr.map(e => e.length)); // 它用于把一个数组转化为用逗号分隔的参数序列，它常用在不定参数个数时的函数调用，数组合并等情形
const result = arr.reduce((pre, cur) => {
  if (cur.length === maxLen) {
    pre[cur[0]] = cur.length;
  }
  return pre;
}, {});
console.log({ result });

// 方法二：
function findLongest(str) {
  if (!str) return {};
  let count = 0;
  let maxCount = 0;
  let cur = str[0];
  let res = {};
  for (let i = 0; i < str.length; i++) {
    const s = str[i];
    if (s === cur) {
      count++;
      if (count > maxCount) {
        // res = { [s]: count };
        res[s] = count;
        maxCount = count;
      }
      if (count === maxCount) {
        res[s] = count;
      }
    } else {
      count = 1;
      cur = s;
    }
  }
  return res;
}
let str2 = "abcaakjbbbb";
console.log(findLongest(str2));

// 方法三：利用一个很简单的正则,全部匹配出来有连续字母的项
// 'aaasdofjaopfjopaiiisjssfopiasdfffff'.match(/(.)\1+/g)
// 得到的结果是什么？ ["aaa", "iii", "ss", "fffff"]

let str3 = "aaasdofjaopfjopaiiisjssfopiasdfffff";
let tempRes = str3.match(/(.)\1+/g); // [ 'aaa', 'iii', 'ss', 'fffff' ]
console.log('tempRes', tempRes);

function findLongest2(str) {
  let count = 0;
  let maxCount = 0;
  let cur = str[0];
  let res = {};
  for(let i = 0; i < str.length; i++) {
    const char = str[i]
    if(char === cur) {
      count++;
      if(count > maxCount) {
        res[char] = count;
        maxCount = count;
      }
      if(count === maxCount) {
        res[char] = count
      }
    } else {
      count = 1;
      cur = char;
    }
  }
  return res;
}
console.log('findLongest2', findLongest2(str3));
