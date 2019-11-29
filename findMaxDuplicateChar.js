// 统计一个字符串出现最多的字母
function findMaxDuplicateChar(str) {
  let obj = {};
  for (var i = 0; i < str.length; i++) {
    if (obj[str.charAt(i)]) {
      // 存在则只增加计数，不放进对象做 key
      obj[str.charAt(i)] = obj[str.charAt(i)] + 1;
    } else {
      obj[str.charAt(i)] = 1;
    }
  }
  // 查看每个对象的数值
  let maxKey = "";
  let maxValue = 0;
  for (var key in obj) {
    if (obj[key] >= maxValue) {
      maxValue = obj[key];
      maxKey = key;
    }
  }
  console.log("maxKey", maxKey);
  console.log("maxValue", maxValue);
}
var str = "aaaaaaaaaabbbbbdddddffffffff";
findMaxDuplicateChar(str); // a 10
