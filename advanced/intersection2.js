// 求多个数组之间的交集

// 方法一：

// 方法二：此方法需要再关注一下去重问题，
// 如果需要去重，可以先把原数组 new Set 一下
function intersectN(...arrs) {
  if (arrs.length === 1) return arrs[0];
  if (arrs.length === 2) return intersect2(...arrs);//如果只有两个 无需reduce 直接求
  return arrs.reduce((a, b) => b = intersect2(a, b))
}
function intersect2(nums1, nums2) {
  //求两个数组的交叉数组
  let res = [];
  let obj = toMap(nums1);
  for (let i of nums2) {
    if (obj[i]) {
        res.push(i)
        obj[i]--
    }
  }
  return res;
}

function toMap(arr) {
  //辅助函数  用于将数组转成map 键值分别是元素和其数量
  let obj = {}
  for (let i of arr) {
    if (obj[i]) obj[i]++
    else obj[i] = 1
  }
  return obj
}

let arr1 = [1, 2, 3, 4, 5, 6, 7, 1, 5]
let arr2 = [3, 5, 4, 1, 5]
let arr3 = [5, 7, 1, 3, 1, 5]

console.log(intersectN(arr1, arr2, arr3)) //[ 5, 1, 3, 5 ] 
console.log('intersection', intersection(arr1, arr2, arr3));