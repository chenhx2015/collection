// list数组转换成树形
// 原始 list 如下
let list =[
  {id:1, name:'部门A', parentId:0},
  {id:2, name:'部门B', parentId:0},
  {id:3, name:'部门C', parentId:1},
  {id:4, name:'部门D', parentId:1},
  {id:5, name:'部门E', parentId:2},
  {id:6, name:'部门F', parentId:3},
  {id:7, name:'部门G', parentId:2},
  {id:8, name:'部门H', parentId:4}
];
// const result = convert(list, ...);

// 转换后的结果如下
// let result = [
//     {
//       id: 1,
//       name: '部门A',
//       parentId: 0,
//       children: [
//         {
//           id: 3,
//           name: '部门C',
//           parentId: 1,
//           children: [
//             {
//               id: 6,
//               name: '部门F',
//               parentId: 3
//             }, {
//               id: 16,
//               name: '部门L',
//               parentId: 3
//             }
//           ]
//         },
//         {
//           id: 4,
//           name: '部门D',
//           parentId: 1,
//           children: [
//             {
//               id: 8,
//               name: '部门H',
//               parentId: 4
//             }
//           ]
//         }
//       ]
//     },
//   ···
// ];

// 方法一：
function convert(list) {
	const res = []
  const map = list.reduce((prev, cur) => (prev[cur.id] = cur, prev), {})
	for (const item of list) {
		if (item.parentId === 0) {
			res.push(item)
			continue
		}
		if (item.parentId in map) {
			const parent = map[item.parentId]
			parent.children = parent.children || []
			parent.children.push(item)
		}
	}
	return res
}
// 时间复杂度 O(n)

// 方法二：递归
function convert2(source, parentId = 0){
  let trees = [];
  for (let item of source) {
    if(item.parentId === parentId) {
      let children = convert2(source, item['id']);
      if(children.length) {
        item.children = children
      }
      trees.push(item);
    }
  }
  return trees;
}

console.log('convert', convert2(list));