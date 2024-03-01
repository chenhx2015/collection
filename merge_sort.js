// 归并排序
// 分治的思想
// 时间复杂度
// 时间复杂度是O(n*logN);
// 分: 每次都需要把数组劈成两半,2^k = n k= logN 有个二的但是数量级是logN.
// 合: O(n);极端情况, 每个都分成长度1,也就是n个数组合并
// 时间复杂度n*logN

function merge(left, right) {
  let temp = new Array();
  while (left.length > 0 && right.length > 0) {
    // 从左右子数组的最小元素中选择较小的元素 push 到 arr
    if (left[0] < right[0]) {
      temp.push(left.shift());
    } else {
      temp.push(right.shift());
    }
  }
  // 输出的数组要加上 left 或 right 剩下的值，由于每次都 push 最小值，则剩余的一定是大值，所以 push 到最后
  // 由于 left 和 right length 可能为相等或相差 1，所以这里 left 和 right 不分先后
  // return temp.concat(left, right);
  return [...temp, ...left, ...right];
}

function mergeSort(arr) {
  // 注意 这是递归调用的出口 
  if (arr.length == 1) {
    return arr;
  } else {
    // 获取数组中间值，如果是 splice 则无需取整，splice 会以向下取整截取
    let mid = parseInt(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
  }
}

console.log('mergeSort', mergeSort([4, 3, 8, 9, 7])); // [ 3, 4, 7, 8, 9 ]


