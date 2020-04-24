// 把 0 全部放到最后去，其他的按原来的顺序排列
let arr = [0, 0, 1, 0, 3, 12];
var moveZeroes = function (arr) {
  let endIndex = arr.length - 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === 0) {
      let tempNum = arr.splice(i, 1);
      arr.push(tempNum);
      endIndex = endIndex - 1;
    }
  }
  arr = [].concat(...arr);
  return arr;
};
let result = moveZeroes(arr);
console.log({ result });
