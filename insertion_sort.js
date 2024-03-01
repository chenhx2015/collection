// 插入排序
function insertion_sort(arr) {
  let len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    // 如果当前这个比上一个小 则交换位置
    while (preIndex >= 0 && current < arr[preIndex]) {
      // 因为当前值已经被抽出，它的序号比需要对比的数的最大序列大1，
      // 所以当满足条件，可以把preIndex + 1的序列的值赋值为 preIndex
      arr[preIndex + 1] = arr[preIndex]; // 右边更小的换到左边来, 其实就是把前面一个换到后面去了
      preIndex--; // 再继续往前一个比 注意此处是内层循环
    }
    // 如果当前这个比上一个大
    arr[preIndex + 1] = current; //  往后挪一个, 外层完成一次循环后，把找到的当前小于current 的前一位数替换成插入元素
  }
  return arr;
}
  
var arr = [3, 5, 7, 1, 4, 56, 12, 78, 25, 0, 9, 8, 42, 37];
console.log(insertion_sort(arr));
// [
//   0,  1,  3,  4,  5,  7,
//   8,  9, 12, 25, 37, 42,
//  56, 78
// ]