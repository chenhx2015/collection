// entry 格式转换 及互换
let entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}
  
// 要求转换成如下对象
// var output = {
//   a: {
//     b: {
//       c: {
//         dd: 'abcdd'
//       }
//     },
//     d: {
//       xx: 'adxx'
//     },
//     e: 'ae'
//   }
// }
function entryMap(obj) {
  // 注意这个 reduce 原始值的设置，
  let resObj = {};
  let keysArr = Object.keys(obj);
  for(let key of keysArr) {
    key.split('.').reduce((prev, curr, index, array) => {
      // 注意下面的判断及返回值
      if(index === array.length - 1) {
        prev[curr] = obj[key];
        return;
      } else {
        prev[curr] = prev[curr] || {};
        return prev[curr];
      }
    }, resObj);
  }
  return resObj;
}

console.log('entryMap', entryMap(entry));
