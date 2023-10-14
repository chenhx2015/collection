// 移动零
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 方法一：splice push
// 复杂度是 O(n^2)
function moveZeroes1(arr) {
  let count = 0;
  for(let i = 0; i < arr.length - count; i++) {
    if(arr[i] === 0) {
      arr.push(arr.splice(i, 1)[0]) // 本身的复杂度就是 O(n)
      // 每次执行一遍上述操作，需要遍历的数组长度-1
      // 采用count计数，可以减少无效判断
      count++; // 累加0的长度
      i--; // 截取了一个元素，i 要递减，否则连续0就会有错
    }
  }
  return arr;
}

console.log('moveZeroes1', moveZeroes1([1, 0, 3, 0, 8])); // [1, 3, 8, 0, 0]

// 方法二：双指针
// 复杂度 O(n)
function moveZeroes2(arr) {
  let j = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] !== 0) {
      if(i === j) {
        j++
      } else {
        // 遇到不是0的数，就和0元素交换位置
        [arr[j++], arr[i]] = [arr[i], arr[j]];
      }
    }
  }
  return arr;
}

console.log('moveZeroes2', moveZeroes2([1, 0, 4, 0, 5])); // [1, 4, 5, 0, 0]
