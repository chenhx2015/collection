// 求数组的最长公共子序列
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
