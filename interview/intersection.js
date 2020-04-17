// 求多个数组之间的交集
// 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]
const intersect = (nums1, nums2) => {
  const obj = {};
  const res = [];
  for (let n of nums1) {
    if (obj[n]) {
      obj[n]++;
    } else {
      obj[n] = 1;
    }
  }
  for (let n of nums2) {
    if (obj[n] > 0) {
      res.push(n);
      obj[n]--;
    }
  }
  return res;
};

let arr1 = [1, 2, 2, 1];
let arr2 = [2, 2];
let result = intersect(arr1, arr2);
console.log({ result }); // [2, 2]
