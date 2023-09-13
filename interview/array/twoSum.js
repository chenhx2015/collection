// 两数之和
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标
// 示例 1：
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// 示例 2：
// 输入：nums = [3,2,4], target = 6
// 输出：[1,2]

// 示例 3：
// 输入：nums = [3,3], target = 6
// 输出：[0,1]

// 可以参考之前的那个题目 两数之和为某个目标值的

function sun(arr, target) {
  for(let i = 0; i < arr.length; i++) {
    let tempi = arr[i];
    for(let j = 1; j < arr.length; j++) {
        if(tempi + arr[j] === target) {
            return {
                [i] : tempi,
                [j] : arr[j]
            }
        }
    }
  }
}
console.log('target: ', sun([3,2,4], 6)); // target:  { '1': 2, '2': 4 }
console.log('target: ', sun([2,7,11,15], 9)); // target:  { '0': 2, '1': 7 }