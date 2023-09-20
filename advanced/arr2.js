// 数组分组，实现以下功能
// 输入 '1, 2, 3, 5, 7, 8, 10' 
// 输出 '1~3, 5, 7~8, 10'

function splitArr(arr) {
  let res = [];
  let temp = arr[0];
  for(let i = 0; i < arr.length; i++) {
    // 如果不是连续的数字
    if(arr[i] + 1 !== arr[i + 1]) {
      if(temp !== arr[i]) {
        res.push(`${temp}~${arr[i]}`)
      } else {
        res.push(`${arr[i]}`)
      }
      temp = arr[i + 1];
    }
  }
  return res;
}
let nums1 = [1, 2, 3, 5, 7, 8, 10];
console.log('splitArr', splitArr(nums1).join(',')); //

// 方法二：原理是一样的
function simplifyStr(num) {
  var result = [];
  var temp = num[0]
  num.forEach((value, index) => {
    if (value + 1 !== num[index + 1]) {
      if (temp !== value) {
        result.push(`${temp}~${value}`)
      } else {
        result.push(`${value}`)
      }
      temp = num[index + 1]
    }
  })
  return result;
}
console.log(simplifyStr(nums1).join(','))