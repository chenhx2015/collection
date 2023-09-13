// 数组编程题
// 随机生成一个长度为 10 的整数类型的数组，
// 例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，
// 将其排列成一个新数组，要求新数组形式如下，
// 例如 [[2, 3, 4, 5], [10, 11], [20]]。

function arrGenerate() {
  let arr = Array.from({length: 10}, () => {
    return Math.ceil(Math.random() * 100);
  })
  // 排序
  arr.sort((a, b) => a - b);
  // 去重
  arr = [...new Set(arr)];
  // 连续值存一个数组，不连续的单独存一个数组
  let resArr = [];
  let newArr = [arr[0]]
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] === arr[i - 1] + 1) {
      newArr.push(arr[i]);
    } else {
      resArr.push(newArr);
      newArr = [arr[i]];
    }
  }
  return resArr;
}

arrGenerate();
