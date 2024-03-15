// 🌿🌿🌿 合并两个有序的数组，合成一个有序的数组 要求复杂度为 O(n)
// 输入：[1, 3, 5] [2, 4, 6]
// 输出：[1, 2, 3, 4, 5, 6]

// 方法一：
function arrSort(arr1, arr2) {
  let [i, j] = [0, 0];
  let newArr = [];
  while(i < arr1.length || j < arr2.length) {
    if(arr1[i] < arr2[j]) {
      newArr.push(arr1[i]);
      i++
    } else if (arr1[i] > arr2[j]) {
      newArr.push(arr2[j]);
      j++
    } else {
      if(arr1[i]) newArr.push(arr1[i]);
      if(arr2[j]) newArr.push(arr2[j]);
      i++;
      j++;
    }
  }
  return newArr;
}
let a = [1, 3, 5];
let b = [2, 4, 6, 8];
console.log('arrSort', arrSort(a, b)) // [1, 2, 3, 4, 5, 6, 8]

// 还有其他方法，比如先合并 再排序之类的，但是复杂度会比较高，上面这个方式比较好

