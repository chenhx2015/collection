// 判断是否是子树
// 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)
// B是A的子结构， 即 A中有出现和B相同的结构和节点值。
// 例如:
// 给定的树 A:

//      3
//     / \
//    4   5
//   / \
//  1   2
// 给定的树 B：
//    4 
//   /
//  1
// 返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。

// 思路：
// 本题采用两个递归互相调用的方式进行求解
// 一个树是否是另一个树的子结构，有3种情况
// 情况一：子树和当前节点完全一致
// 情况二：子树在左子树中
// 情况三：子树在右子树中
// 第一个递归用于控制发生的是哪一种情况
// 第二个递归则用于进行遍历

function isSubStructure(A, B) {
  if (!A || !B) return false;
  // 如果这次递归传进来的两个根节点相同，那么就从这两个根节点开始，
  // 对它们的左右子树对应来判断是否相等
  if (
    A.val === B.val 
    && isSameTree(A.left, B.left)
    && isSmaeTree(A.right, B.right)
  ) return true;
  // 这里如果第一次传进来的AB根节点都不相同，那么就会进递归，
  // 分别判断A的左子树和右子树是否存在B的结构，所以这里用或关系即可
  return isSubStructure(A.left, B) || isSubStructure(A.right, B)

  function isSameTree(nodeA, nodeB) {
    if(nodeB === null) return true;
    if(nodeA === null) return false;
    if(nodeA.val === nodeB.val) 
      return isSameTree(nodeA.left, nodeB.left) && isSameTree(nodeA.right, nodeB.right)
    return false;
  }
}