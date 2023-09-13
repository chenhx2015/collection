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
console.log({ result }); // { result: [ 1, 3, 12, 0, 0, 0 ] }

let moveZeros2 = (arr) => {
  const len = arr.length;
  let j = 0;
  for(let i = 0; i < len; i++) {
    if (arr[i] !== 0) {
      if(i === j) {
        j++;
      } else {
        [arr[j++], arr[i]] = [arr[i], arr[j]]; 
      }
    }
  }
  return arr;
}

console.log('moveZeros2', moveZeros2([0, 1, 11, 0, 2, 4, 0])); // [1, 11, 2, 4, 0, 0, 0]
