// 最长公共子串 🌿🌿🌿
// 子串要求在原字符串中是连续的,而子序列则只需保持相对顺序一致,并不要求连续。
// 题目：
// 给定两个字符串str1和str2,输出两个字符串的最长公共子串
// 题目保证str1和str2的最长公共子串存在且唯一。

// 示例
// 输入： “1AB2345CD”，“12345EF”
// 输出： “2345”

function LCS(str1, str2) {
  let maxlength = 0, index = 0;
  for(let i = 0; i < str2.length; i++) {
    for(let j = 0; j < str2.length; j++) {
      if(str1.indexOf(str2.slice(i, j)) !== -1) {
        if(maxlength < j - i) {
          maxlength = j - i;
          index = i;
        }
      }
    }
  }
  if(!maxlength) return -1;
  return str2.slice(index, maxlength + index);
}

console.log('LCS', LCS('1AB2345CD', '12345EF')); // 2345

// 方法二：动态规划 🤔️ 目前没太理解这个方法 而且这个时间复杂度有点高 循环太多了
function LCS2(str1, str2) {
  let dp = [];
  let maxi, maxj;
  let maxlen = 0;
  for(let i = 0; i < str1.length + 1; i++) {
    dp[i] = [];
    for(let j = 0; j < str2.length + 1; j++) {
      dp[i].push(0);
    }
  }
  for(let i = 1; i < str1.length + 1; i++) {
    for(let j = 1; j < str2.length + 1; j++) {
      if(str1[i - 1] !== str2[j - 1]) {
        dp[i][j] = 0
      } else {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if(dp[i][j] > maxlen) {
          maxlen = dp[i][j];
          maxi = i;
          maxj = j;
        }
      }
    }
  }
  return str2.slice(maxj - maxlen, maxj);
}

console.log('LCS2', LCS2('1AB23456CD', '123456EF')); // 23456

// 方法三：
function LCS3(str1, str2) {
  if (str1 === "" || str2 === "") {
   return "";
  }
  var len1 = str1.length;
  var len2 = str2.length;
  var a = new Array(len1);
  var maxLen = 0;
  var maxPos = 0;
  for (var i = 0; i < len1; i++) { //行
   for (var j = len2 - 1; j >= 0; j--) {//列
    if (str1.charAt(j) == str2.charAt(i)) {
     if (i === 0 || j === 0) {
      a[j] = 1;
     } else {
      a[j] = a[j - 1] + 1;
     }
    } else {
     a[j] = 0;
    }
    if (a[j] > maxLen) {
     maxLen = a[j];
     maxPos = j;
    }
   }
  }
  return str1.substr(maxPos - maxLen + 1, maxLen);
 }

console.log('LCS3', LCS3('1AB23456CD', '123456CDEF')); // 23456CD
 
// 但方法三其实并不是最优的，为什么？因为上面的写法必须等待两层循环都完成。有没有相对更快一些的方法呢？
// 设有字符串a、b，其长度分别为len1、len2，其公共字子串一定是 <= Math.min(len1, len2)，而且子串必定连续，且一定是a、b的子串。
function LCS4(s1,s2){
  var commonStr = '', L1 = s1.length, L2 = s2.length;
  // 比较s1,s2的长度，看谁长谁短
  var shortStr = L1 > L2 ? s2 : s1;
  var longStr = L1 > L2 ? s1 : s2;
  // 短的字符串的长度
  var strLen = shortStr.length;

  // 遍历短的字符串，从大到小递减
  for (let j = strLen; j > 0; j--) {
    // 不同的长度有总共有i个可能，从左到右遍历
    for (let i = 0; i <= strLen - j; i++) {
      // 截取出短字符串的部分字符串
      commonStr = shortStr.substr(i, j);
      // 为了便于观测运行的过程，打印看一下会直观很多
      console.log('commonStr:',commonStr,'i:',i,'j:',j);

      // 放在长字符串里看看有没有匹配的，如果有直接返回
      if (longStr.indexOf(commonStr) >= 0) return commonStr
    }
  }
  // 没有的话返回空字符串
  return ''
 }

 console.log('LCS4', LCS4('1AB23456CD', '123456CDEF')); // 23456CD
 
 