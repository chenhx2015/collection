// 旋转数组
// 旋转数组分为左旋转和右旋转两类
// 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数
// 示例1:
// 输入: nums = [1,2,3,4,5,6,7], k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右轮转 1 步: [7,1,2,3,4,5,6]
// 向右轮转 2 步: [6,7,1,2,3,4,5]
// 向右轮转 3 步: [5,6,7,1,2,3,4]

// 示例2:
// 输入：nums = [-1,-100,3,99], k = 2
// 输出：[3,99,-1,-100]
// 解释: 
// 向右轮转 1 步: [99,-1,-100,3]
// 向右轮转 2 步: [3,99,-1,-100]

// 提示
// 1 <= nums.length <= 105
// -231 <= nums[i] <= 231 - 1
// 0 <= k <= 105

let nums = [1, 2, 3, 4, 5, 6, 7];
let k = 2;

// 方法一：
function rotateArr(nums, k) {
  for(let i = 0; i < k; i++) {
    // let p = nums.pop()
    // nums.unshift(p)
    // 或者写成一行
    nums.unshift(nums.pop())
  }
  return nums;
}

console.log('rotateArr', rotateArr(nums, k)); // [6, 7, 1, 2, 3, 4, 5]

// 方法二（原理和方法一差不多）：
// splice 是删除数组元素并返回，返回的是数组，所以需要扩展运算符处理一下
// splice 会改变原数组
// slice 不会改变原数组，可用于数组和字符串的截取
// 总结：想增加或删除数组的某些值， 用splice；想截取数组或字符串用slice，取返回值
function rotateArr2(nums, k) {
  for(let i = 0; i < k; i++) {
    nums.unshift(...nums.splice(nums.length - 1, 1))
  }
  return nums;
}

console.log('rotateArr2', rotateArr([-1, -100, 5, 2], k)); // [ 5, 2, -1, -100 ]


// 方法三（原理和方法二差不多）：
function rotateArr3(nums, k) {
  for(let i = 0; i < k; i++) {
    nums.splice(0, 0, ...nums.splice(nums.length - 1, 1))
  }
  return nums;
}

console.log('rotateArr3', rotateArr([-1, -100, 5, 6], k)); // [ 5, 6, -1, -100 ]
