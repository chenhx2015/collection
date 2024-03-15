// 两数之和 🌿🌿🌿
// 给定一个数组 nums 和一个目标值 target，在该数组中找出和为目标值的两个数
// 输入： nums: [8, 2, 6, 5, 4, 1, 3] ； target:7
// 输出： [2, 5]

// 时间复杂度O(n)、 空间复杂度O(n)
function twoNumAdd(arr, target) {
    if (Array.isArray(arr)) {
      // 使用map将遍历过的数字存起来，空间换时间
      let map = {};
      for (let i = 0; i < arr.length; i++) {
        // 从map中查找是否有key 等于 target-nums[i]，如果有，则条件成立，返回结果
        if (map[target - arr[i]] !== undefined) {
          return [target - arr[i], arr[i]];
        } else {
          // 条件不成立，将该值存起来
          map[arr[i]] = i;
        }
      }
    }
    return [];
  }

let arr = [8, 2, 6, 5, 4, 1, 3];
let target = 7;
console.log('twoNumAdd: ', twoNumAdd(arr, target)) // [2, 5]
