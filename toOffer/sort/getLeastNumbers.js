// 最小的k个数
// 输入整数数组 arr ，找出其中最小的 k 个数。例如，
// 输入4、5、1、6、2、7、3、8这8个数字，
// 则最小的4个数字是1、2、3、4。

// 方法一：快速排序sort之后，slice(0, k)获取对应个数，再返回
function getLeastNumbers(arr, k) {
  var arr = arr.sort((a,b)=>{
    return a - b;
  })
  return arr.slice(0,k)
}
console.log('getLeastNumbers', getLeastNumbers([1, 2, 3, 4], 2));
// [1, 2]

// 方法二：也是先排序
function getLeastNumbers2(input, k){
  let res = [];
  if(k > input.length) return [];
  for(let i = 0; i < k; i++){
      let sortarray = input.sort((a,b) => a - b);
      res.push(sortarray[i]);
  }
   return res;
}

// 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
// 若 a 等于 b，则返回 0。
// 若 a 大于 b，则返回一个大于 0 的值。
