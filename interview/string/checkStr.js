// 判断字符串是否是回文
// 方法一：
function checkStr(str) {
  return str === str.split('').reverse().join('');
}

console.log(checkStr('noon')); // true
console.log(checkStr('noony')); // false

// 方法二：将原有str进行倒序循环生成新str1，两者比对判断
function checkStr2(str) {
  let len = str.length;
  let newStr = '';
  for(let i = len - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return newStr === str;
}

console.log(checkStr2('noon')); // true
console.log(checkStr2('noony')); // false

// 方法三：
function checkStr3(str) {
  let len = str.length;
  let resultArr = [];
  for(let i = 0; i < len; i++) {
    // 依次进行前后对比 相对应的位置的字符进行比较
    const result = str.charAt(i) === str.charAt(len - 1 - i);
    resultArr.push(result);
  }
  return resultArr.indexOf(false) === -1
}

console.log(checkStr3('noon')); // true
console.log(checkStr3('noony')); // false
