// 实现 flatten
// 方法一：
function flatten(arr) {
  return arr.reduce((cal, curr) => 
    Array.isArray(curr) ? cal.concat(flatten(curr)) : cal.concat(curr), [])
}

var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
console.log('flatten', flatten(arr1));
// [ 1, 2, 3, 1, 2, 3, 4, 2, 3, 4 ]
