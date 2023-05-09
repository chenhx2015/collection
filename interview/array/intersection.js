// 找出两个数组中的交集

// 方法一：常规 for 循环 
let arr1 = [1,2,3,4]
let arr2 = [4,5,6]

function intersection(arr1, arr2) {
  let intersection = []
  for(let i = 0; i < arr1.length;i++){
    let _item = arr1[i]
    for(let j = 0; j < arr2.length;j++){
      if(_item === arr2[j]){
          intersection.push(_item)
      }
    }
  }
  return intersection;
}
console.log('intersection', intersection(arr1, arr2)) // [4]

// 方法二：利用filter includes
function intersection2(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item));
}

console.log('intersection2', intersection2(arr1, arr2)) // [4]

// 方法三：
function intersection3(arr1, arr2) {
  let _arr = arr1.concat(arr2).sort((a, b) => a - b);

  let result = []
  _arr.reduce((pre,now) => {
    if(pre === now){
      result.push(now)
    }
    return now
  })
  return result;
}

console.log('intersection3', intersection3(arr1, arr2)) // [4]

// 找两个数组的并集
// 思路：
// 方法一：利用解构赋值...和Set的唯一性
// 方法二：数组合并，排序，再利用reduce对比前一个和后一个