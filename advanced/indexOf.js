// 实现 indexOf() 🌿🌿🌿
// 注意：不仅要考虑这个方法的实现功能，还要需要考虑到该方法的参数

// 用最简洁的代码实现 indexOf 方法
// indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置,不存在则返回 -1
// stringObject.indexOf(searchvalue,fromindex)
let str = "abacdbeabfgg";
// let result = "";
// result = str.indexOf("d"); // 3
// console.log({ result });

// 字符串去重的方法
// let tempArr = str.split("");
// let realArr = Array.from(new Set(tempArr));

// String.prototype.myIndexOf = function(char) {

// }

function myIndexOf(str, char) {
  if (str.includes(char)) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === char) {
        return i;
      }
    }
  } else {
    return -1;
  }
}
let result = myIndexOf(str, "c");
console.log({ result }); // 3

// 请注意，是字符串的方法（貌似数组也行） && 要考虑到第二个参数 && 要考虑到不仅仅是匹配单个字符
// 改进如下

function myIndexOf2(str, char, start) {
  let charLength = char.length;
  let strLength = str.length;
  if (start > strLength) {
    return -1;
  }
  if (charLength == 1) {
    for (let i = start; i < str.length; i++) {
      if (str[i] === char) {
        return i;
      }
    }
  } else if (charLength > 1) {
    for (let i = start; i < strLength; i++) {
      const temp = str.slice(i, charLength + i);
      if (char === temp) {
        return i;
      }
    }
  }
  return -1;
}
let str2 = "abacdbeabfgg";
let result2 = myIndexOf2(str2, "ab", 3);
console.log({ result2 }); // 7

// 思考：lastIndexOf 如何实现？

