// 二叉搜索树的第k大节点
// 给定一棵二叉搜索树，请找出其中第 k 大的节点的值。

// 示例 1:

// 输入: root = [3,1,4,null,2], k = 1
//    3
//   / \
//  1   4
//   \
//    2
// 输出: 4
// 示例 2:

// 输入: root = [5,3,6,2,4,null,null,1], k = 3
//        5
//       / \
//      3   6
//     / \
//    2   4
//   /
//  1
// 输出: 4

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
// 思路：(先序遍历：右根左)
// 按照右根左的遍历顺序，
// 就是从大到小的遍历顺序。每遍历一个，k–，当k==0时，即为所求。

var kthLargest = function(root, k) {
  var res;
  var  dfs = function(cur) {
      if(!cur) return;  
      dfs(cur.right);
      k--;
      if(k == 0) {
        res = cur.val;
        return;
      }
      dfs(cur.left);   
  }
  dfs(root);
  return res;
};