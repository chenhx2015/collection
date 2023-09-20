// 重建二叉树
// 输入某二叉树的前序遍历和中序遍历的结果，请构建该二叉树并返回其根节点。
// 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
//     3
//    / \
//   9  20
//     /  \
//    15   7
// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// 已知前序+中序遍历->重建二叉树（遍历方法）
// 思路：
// 1.判断数组大小是否为空，若为空则说明空节点，则返回null
// 2.若不为空，就获取前续数组的第一个元素作为根节点元素rootVal
// 3.确定切割点：找到前序数组第一个元素 rootVal 在中序数组的下标index，作为切割点
// 4.切割中序数组，切成中序左数组和中序右数组（一定要先切中序数组，勿搞混顺序）
// 5.切割前序数组，切成前序左数组和前序右数组
// 6.递归处理左子树和右子树

var buildTree = function(preorder, inorder) {
  if (!preorder.length) return null;
  const rootVal = preorder.shift(); // 从前序遍历的数组中获取中间节点的值， 即数组第一个值
  const index = inorder.indexOf(rootVal); // 获取中间节点在中序遍历中的下标
  const root = new TreeNode(rootVal); // 创建中间节点
  root.left = buildTree(preorder.slice(0, index), inorder.slice(0, index)); // 创建左节点
  root.right = buildTree(preorder.slice(index), inorder.slice(index + 1)); // 创建右节点
  return root;
};

// 复杂度分析：
// 时间复杂度：O（N）
// 空间复杂度： O（N）

// 第二种：已知后序+中序遍历->重建二叉树
// 思路：
// 1.判断数组大小是否为空，若为空则说明空节点，则返回null
// 2.若不为空，就获取后续数组的最后一个元素为根节点元素rootVal
// 3.确定切割点：找到后序数组最后一个元素 rootVal 在中序数组的下标index，作为切割点
// 4.切割中序数组，切成中序左数组和中序右数组（一定要先切中序数组，勿搞混顺序）
// 5.切割后序数组，切成后序左数组和后序右数组
// 6.递归处理左子树和右子树

var buildTree = function(inorder, postorder) {
  if(!inorder.length) return null;
  const rootVal = postorder.pop(); // 后序遍历的数组中的最后一个元素 = 中间节点（根节点）的值
  let index = inorder.indexOf(rootVal); // 获取中间节点（根节点）在中序遍历的数组中下表
  const root = new TreeNode(rootVal);// 创建中间节点（根节点）
  root.left = buildTree(inorder.slice(0,index),postorder.slice(0,index)); // 建立左子树
  root.right = buildTree(inorder.slice(index+1),postorder.slice(index)); // 建立右子树
  return root;
};

// 复杂度分析：
// 时间复杂度：O（N）
// 空间复杂度： O（N）

// 总结
// 重点是确定切割点（即是找到根节点在中序数组中的下标）
// 结合图解，分割中序数组+前/后序数组，注意切割的下表。
// 别忘了确定确定终止条件：判断当前数组是否为空，return null；