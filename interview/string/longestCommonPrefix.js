// 字符串数组 找 最长公共前缀 🌿🌿🌿
// 编写一个函数来查找字符串数组中的最长公共前缀。
// 输入：[“abca”,“abc”,“abca”,“abc”,“abcc”]
// 输出：“abc”

// 方法一：
var longestCommonPrefix = function(arr) {
  if(arr.length) {//判断数组是否为空
    var res = ""; //记录公共前缀
    for(var i = 0; i < arr[0].length; i++) {
      var temp = arr[0][i];
      //每个字符串是否都有相同的字符
      if(arr.every(el => {
        return el.charAt(i) == temp;
      })) {
        res += temp; //记录公共前缀
      } else break; //如果返回false，就停止判断，说明不是前缀了
    }
    return res;
  }
  return ""; //说明是空数组
};

console.log(longestCommonPrefix(['abc', 'abcdf', 'abctr', 'abckj'])); // abc

// 方法二：
// 字符串拆分成数组 str.split('')
// 利用 arr.every 判断每一个下标对应的字符是否相同

const longestCommonPrefix2 = function (strs) {
  if (strs.length <= 1) return strs[0] || "";
  const firstStr = strs[0].split("");
  let str = "";
  for (let j = 0; j < firstStr.length; j++) {
    if (strs.slice(1).every((str) => str[j] === firstStr[j])) {
      str += firstStr[j];
    } else {
      break;
    }
  }
  return str;
};

console.log(longestCommonPrefix2(['abc', 'abcdf', 'abctr', 'abckj'])); // abc

// 方法三： 递归实现
// 获取最小字符串长度 minLen，减少比较数量
// 利用 substr 获取最小字符串的前 minLen 个字符
// 利用 arr.every 判断剩余的字符串是否全部包含在最小字符串中
// indexOf 判断最小字符串是否包含在剩余字符串中，如果存在返回 0，否则返回 -1

const longestCommonPrefix3 = function (strs) {
  if (strs.length === 0) return "";
  let str = "";
  let minLen;
  let minStr = strs[0];
  strs.forEach((str) => {
    minLen = minLen === undefined ? str.length : Math.min(str.length, minLen);
  });
  const findPrefix = (index) => {
    const subStr = minStr.substr(0, index);
    if (index > minLen) {
      return;
    }
    if (strs.slice(1).every((str) => str.indexOf(subStr) === 0)) {
      str = subStr;
      findPrefix(index + 1);
    } else {
      return;
    }
  };
  findPrefix(1);
  return str;
};

console.log(longestCommonPrefix3(['abc', 'abcdf', 'abctr', 'abckj'])); // abc
