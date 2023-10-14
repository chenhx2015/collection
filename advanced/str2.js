// 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，
// 查找是否存在字符串 T，T 的长度是 m，
// 若存在返回所在位置

// 思路
// 因为 T 的 length 是一定的，所以在循环S的时候 ，
// 循环当前项 i 后面至少还有 T.length 个元素

// eg: 'wewedfr' 'wed' 存在 位置为2-4
function strFind(S, T) {
  if (S.length < T.length) return -1;
  for (let i = 0; i < S.length ; i++) {
    if (S.substr(i, T.length) === T) return i ;
  };
  return -1;
}

// console.log('strFind1', strFind('wewedfr', 'wed')) // 2
// console.log('strFind2', strFind('wewedfr', 'fr')) // 5
// console.log('strFind2', strFind('wewedfr', 'r')) // 6
// console.log('strFind2', strFind('wewedfr', 'ew')) // 1

// 方法二：
const find2 = (S, T) => S.search(T);
// console.log('find1', strFind('wewedfr', 'wed')) // 2
// console.log('find2', strFind('wewedfr', 'fr')) // 5
// console.log('find3', strFind('wewedfr', 'r')) // 6
// console.log('find4', strFind('wewedfr', 'ew')) // 1

// 方法三：
const find3 = (S, T) => {
  const matched = S.match(T) 
  return matched ? matched.index : -1 
}
console.log('find3', find3('wewedfr', 'wed')) // 2
console.log('find3', find3('wewedfr', 'fr')) // 5
console.log('find3', find3('wewedfr', 'r')) // 6
console.log('find3', find3('wewedfr', 'ew')) // 1
