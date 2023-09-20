// 二叉树的镜像
// 请完成一个函数，输入一个二叉树，该函数输出它的镜像。
// 例如输入：
//      4

//    /   \

//   2     7

//  / \   / \

// 1   3 6   9

// 镜像输出：
//      4

//    /   \

//   7     2

//  / \   / \

// 9   6 3   1

// 示例 1：
// 输入：root = [4,2,7,1,3,6,9]
// 输出：[4,7,2,9,6,3,1]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
/* 思路,符合递归的要求，每个子树都要进行节点交换
 1.交换左右两个节点
 2.对两个节点再进行镜像处理
 
 递归的功能：交换节点（镜像处理）
 递归的出口：节点为空
 等价表达式：整棵树的镜像 = 交换左右节点 + 左子树镜像 + 右子树镜像*/
 var mirrorTree = function (root) {
  if (root) {
    const tmp = root.left;
    root.left = root.right;
    root.right = tmp;
    mirrorTree(root.left);
    mirrorTree(root.right);
  }
  return root;
};
  