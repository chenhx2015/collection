// 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]

// 得到一个两数之间的随机整数，包括两个数在内
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}
// 随机生成10个整数数组, 排序, 去重
let initArr = Array.from({ length: 10 }, (v) => {
  return getRandomIntInclusive(0, 99);
});
initArr.sort((a, b) => {
  return a - b;
});
initArr = [...new Set(initArr)];

// 放入hash表
// 思路：把余数相同的放进改区间内，比如0-9， 10-19， 20-19，，，，每个区间都按照余数来放置
let obj = {};
initArr.map((i) => {
  const intNum = Math.floor(i / 10);
  if (!obj[intNum]) obj[intNum] = [];
  obj[intNum].push(i);
});
console.log({ obj });
// { obj:
//   { '1': [ 13, 19 ],
//     '5': [ 51, 52, 56 ],
//     '6': [ 68 ],
//     '7': [ 75, 78 ],
//     '8': [ 85 ]
//   }
// }
// 输出结果
const resArr = [];
for (let i in obj) {
  resArr.push(obj[i]);
}
console.log(resArr);
// [ [ 13, 19 ], [ 51, 52, 56 ], [ 68 ], [ 75, 78 ], [ 85 ] ]
