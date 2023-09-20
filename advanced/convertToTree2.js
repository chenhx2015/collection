// 如何将
// [
//   { id: 1 }, 
//   { id: 2, pId: 1 },
//   ...
// ] 
// 的重复数组（有重复数据）转成树形结构的数组
// [
//   { id: 1,
//     child: [{id: 2, pId: 1}]
//   },
//   ...
// ] 
//（需要去重）

// function convertToTree(source, pId = 0){
//   let trees = [];
//   for(let item of source) {
//     if(item.pId === pId) {
//       let children = convertToTree(item, item.id);
//       if(children.length) {
//         item.children = children
//       }
//       trees.push(item);
//     }
//   }
//   return trees;
// }

// 方法一：
// @todo 需要再理解一下这个思路
const fn = arr => {
  const res = []
  const map = arr.reduce((prev, cur) => ((prev[cur.id] = cur), prev), {})
  for (const item of Object.values(map)) {
    if (!item.pId) {
      res.push(item)
    } else {
      const parent = map[item.pId]
      parent.child = parent.child || []
      parent.child.push(item)
    }
  }
  return res
}

let source = [
  { id: 1 }, 
  { id: 2, pId: 1 },
  { id: 3, pId: 1 },
  { id: 4, pId: 2 }
] 

console.log('fn1', fn(source));
// console.log('convertToTree', convertToTree(source));