// 求数组的最长公共子序列 🌿🌿🌿
// 子串：重点在于连续；子序列：顺序一样就行
// 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，
// 返回 [2, 2]

const intersect = (num1, num2) => {
  let map = {};
  let res = [];
  for(let val of num1) {
    if(map[val]) {
      map[val]++
    } else {
      map[val] = 1
    }
  }
  for(let val of num2) {
    if(map[val]) {
      res.push(val);
      map[val]--;
    }
  }
  return res;
}

const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2]
console.log('intersect', intersect(nums1, nums2)); // [2, 2]

const nums3 = [1, 2, 4, 5, 6, 7];
const nums4 = [2, 2, 5, 6, 7]
console.log('intersect', intersect(nums3, nums4)); // [2, 5, 6, 7]

const nums5 = [9, 7, 3, 2, 1];
const nums6 = [7, 3, 9, 2, 10];
console.log('intersect', intersect(nums5, nums6)); // [7, 3, 9, 2] 这个有点问题
// 所以排好序的才不会有这个问题