// 平衡二叉树
// 输入一棵二叉树的根节点，判断该树是不是平衡二叉树。
// 如果某二叉树中任意节点的左右子树的深度相差不超过1，
// 那么它就是一棵平衡二叉树。

// 示例 1:

// 给定二叉树 [3,9,20,null,null,15,7]

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回 true 。

// 示例 2:

// 给定二叉树 [1,2,2,3,3,null,null,4,4]

//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// 返回 false 。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 思路：这道题属于二叉树考查深度的问题
// 本题的核心在于知道二叉树的深度怎么求：
// 二叉树的深度 = 左子树的深度与右子树的深度中的最大值 + 1，这是核心解题点

var isBalanced = function(root) {
  let flag = true;
  dfs(root);
  return flag;
  function dfs(root) {
      if (!root) return 0;
      let l = dfs(root.left);
      let r = dfs(root.right);
      if (Math.abs(l - r) > 1) {
          flag = false;
      }
      return Math.max(l,r) + 1;
  }
};
