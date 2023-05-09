// 输出 超出数组长度一半的 数组元素
// 题目：数组中有一个数字出现的次数超出了数组长度的一半，请找出这个数字
// 例如：一个长度为9的数组 [1, 2, 3, 2, 2, 2, 5, 4, 2]，2出现了5次, 超出了数组的长度
// 因此输出 2, 不存在则输出 0

// eg: arr [1, 2, 3, 2, 2, 2, 5, 4, 2]

function moreThanHalfNumSolution(array) {
  let out = 0;
  let obj = {};
  let length = array.length / 2;
  array.forEach(item => {
    !obj[item] ? obj[item] = 1 : obj[item] ++;
  });
  for (let [key, value] of Object.entries(obj)) {
    if (value > length) {
      out = key;
    }
  }
  return out;
}

let arr = [1, 2, 3, 2, 2, 2, 5, 4, 2];
let test = moreThanHalfNumSolution(arr);
console.log('test', test); // 2
// obj { '1': 1, '2': 5, '3': 1, '4': 1, '5': 1 }