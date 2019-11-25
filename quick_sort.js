// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var leftArr = [];
  var rightArr = [];
  let q = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > q) {
      rightArr.push(arr[i]);
    } else {
      leftArr.push(arr[i]);
    }
  }
  return [].concat(quickSort(leftArr), [q], quickSort(rightArr));
}

let arrResult = quickSort([10, 25, 4, 8, 9]);
console.log(arrResult);
