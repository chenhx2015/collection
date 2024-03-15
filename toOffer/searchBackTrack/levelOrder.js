// 二叉树的层次遍历 🌿🌿🌿
// 从上到下打印二叉树
// 例如:
// 给定二叉树: [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回：
// [3,9,20,15,7]

// 其实就是不断存值的过程，然后再找左树和右树的过程，左树和右树继续存值
function levelOrder(root) {
  if(root === null) return [];
  let queue = []; // 存放每次遍历的节点
  queue.push(root);
  let res = []; // 存放最终输出的值
  while(queue.length > 0) {
    let tempNode = queue.shift();
    res.push(tempNode.value); // 先存放自己的值，然后再找左树和右树
    if(tempNode.left != null) {
      queue.push(tempNode.left)
    }
    if(tempNode.righr != null) {
      queue.push(tempNode.right);
    }
  }
  return res;
}
