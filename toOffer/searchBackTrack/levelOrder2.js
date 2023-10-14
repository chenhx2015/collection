// 从上到下打印二叉树 II
// 请实现一个函数按照之字形顺序打印二叉树，
// 即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，
// 第三行再按照从左到右的顺序打印，其他行以此类推。

// 例如:
// 给定二叉树: [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层次遍历结果：

// [
//   [3],
//   [20,9],
//   [15,7]
// ]

function levelOrder2(root) {
  if(root === null) return [];
  let res = [];
  let queue = [];
  queue.push(root);
  let reverse = false; // 用来标记是奇数行还是偶数行 交替的
  while(queue.length > 0) {
    let length = queue.length;
    let item = []; // 用来存放每一层 因为题目要求是二维数组的 要一一对应
    for(let i = 0; i < length; i++) {
      let tempNode = queue.shift();
      if(reverse) {
        item.unshift(tempNode.val);
      } else {
        item.push(tempNode.val);
      }
      if(tempNode.left != null) queue.push(tempNode.left);
      if(tempNode.right != null) queue.push(tempNode.right);
    }
    res.push(item);
    reverse = !reverse;
  }
  return result;
}
