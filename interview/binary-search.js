// 二分查找：是一种搜索某个值的索引的算法
// 基本条件：有序的数组
// 思路：
// 1. 将数组折半，分成左右两个数组。
// 2. 判断要查找的数和中间位置数值的大小，来判断要查找的数实在哪一半
// 3. 之后继续折半查找，直至找到这个数
// 两种方法：(非递归和递归)
// 1. 一种是非递归方式，采用while方式，判断是否符合要求
// 2. 采用if方式，依次递归，找到相应的值

/**
 * @param {*} arr 已排好的数组
 * @param {*} key 想要查找的值
 */
function binary_search(arr, key) {
  let left = 0; // 第一个值的索引
  let right = arr.length - 1; // 最后一个值的索引
  while (left <= right) {
    let mid = parseInt((left + right) / 2);
    if (arr[mid] === key) {
      return mid;
    } else if (arr[mid] < key) {
      left = mid + 1;
    } else if (arr[mid] > key) {
      right = mid - 1;
    } else {
      return -1;
    }
  }
}
// 测试
let arr1 = [1, 3, 5, 6, 7, 8, 9, 10];
let result = binary_search(arr1, 9);
console.log({ result });

// 方法二：递归
function search(arr, left, right, key) {
  if (left > right) {
    return -1;
  }
  let mid = parseInt((left + right) / 2);
  if (arr[mid] === key) {
    return mid;
  } else if (arr[mid] < key) {
    left = mid + 1;
    return search(arr, left, right, key);
  } else if (arr[mid] < key) {
    right = mid - 1;
    return search(arr, left, right, key);
  } else {
    return -1;
  }
}

let arr2 = [1, 3, 5, 6, 7, 8, 9, 10];
let result2 = binary_search(arr2, 6);
console.log({ result2 });
