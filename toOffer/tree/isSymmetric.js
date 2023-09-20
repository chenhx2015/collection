// 对称的二叉树
// 请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。
// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
//     1

//    / \

//   2   2

//  / \ / \

// 3  4 4  3

// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
//     1

//    / \

//   2   2

//    \   \

//    3    3

// 示例 1：
// 输入：root = [1,2,2,3,4,4,3]
// 输出：true

// 示例 2：
// 输入：root = [1,2,2,null,3,null,3]
// 输出：false

// 思路：
// 这道题可以用递归来解决，若有两个节点p和q相等，
// 那么就检查p节点的左孩子和q节点的右孩子、
// p节点的右孩子和q节点的左孩子是不是都相等，就这样递归下去

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
var isSymmetric = function(root) {
  if (!root) return true;

  return d(root.left, root.right);

  function d(p, q) {
    if (!p && !q) return true;

    if (p && q && p.val === q.val) {
      return d(p.left, q.right) && d(p.right, q.left);
    } else {
      return false;
    }
  }

};
