// 找两个有序数组的中位数 (难度：困难)
// 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
// 请找出这两个有序数组的中位数。
// 要求算法的时间复杂度为 O(log(m+n))

// 示例
// nums1 = [1, 3]
// nums2 = [2]
// 中位数 2

// nums1 = [1, 2]
// nums2 = [3, 4]
// 中位数是(2 + 3) / 2 = 2.5

function median(arr1, arr2) {
  let temp = [...arr1, ...arr2].sort((a, b) => a - b);
  let medianIndex = temp.length / 2;
  let median;
  if(parseInt(medianIndex) === medianIndex) {
    median = (temp[medianIndex] + temp[medianIndex - 1]) / 2
  } else {
    median = temp[Math.floor(medianIndex)]
  }
  return median;
}
console.log('median', median([1, 2], [3, 4])); // 2.5
console.log('median', median([1, 3], [2])); // 2
console.log('median', median([1, 3, 4, 5, 8], [2])); // 3.5
console.log('median', median([1, 3, 4, 5, 8], [2, 10])); // 4