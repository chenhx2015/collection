// 二叉搜索树的最近公共祖先
// 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，
// 最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 
// x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

// 说明:
// 所有节点的值都是唯一的。
// p、q 为不同节点且均存在于给定的二叉搜索树中。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 思路：分析题目可以得出要接此题首先要明白两个问题：
// 根据二叉搜索树的特性，公共祖先一定小于p、q两节点中更大的值，一定大于p、q两节点中更大的值。
// 因为是最近，所以遍历顺序一定是后序遍历，利用递归回溯的特点，遇到的第一个满足条件一的节点一定就是最近公共祖先，直接返回，后续检测到返回的是节点而不是null后，继续将收到的返回值返回就可。

var lowestCommonAncestor = function(root, p, q) {
  let dfs = function(root, p, q) {
    // 递归终止条件
    if (!root) return null;
    
    if (root.val < q.val) {
      const isLeftTrue = lowestCommonAncestor (root.right, p, q);
      if (isLeftTrue) return isLeftTrue;
    }
    // 记录右子树是否找到
    else if (root.val > p.val) {
      const isRightTrue = lowestCommonAncestor (root.left, p ,q);
      if (isRightTrue) return isRightTrue;
    }
    // 一个都没找到、
    else return root;
  }
  if (p.val < q.val) {
    [p, q] = [q, p];
  }
  return dfs(root, p, q)
};

// 题目二：二叉树的最近公共祖先
// 思路：采用回溯的思想，而递归自带回溯特性，所以递归很适合解这题。
// 分析：
// 记录当前节点的左子树，右子树有没有找到目标节点和当前节点是否是目标节点，因为题目中给出一个节点也可以是他自己的祖先节点，那么就有如下四种情况：

// 当前节点是目标节点且左子树或右子树也找到目标节点，说明当前节点就是最近父节点，记录答案
// 当前节点不是目标节点，但左右子树中俊找到目标节点，说明当前节点就是最近父节点，记录答案
// 当前节点，左子树，右子树中只找到一个目标节点，返回true
// 一个都没找到，返回false

var lowestCommonAncestor = function(root, p, q) {
  // 递归终止条件
  if (root === p || root === q || !root) {
      return root;
  } 
  // 记录左子树是否找到
  const isLeftTrue = lowestCommonAncestor (root.left, p, q);
  // 记录右子树是否找到
  const isRightTrue = lowestCommonAncestor (root.right, p ,q);
  // 左右子树都找到目标节点
  if (isLeftTrue && isRightTrue)return root;
  // 左子树中未找到，右子树中俊找到目标节点
  if (!isLeftTrue && isRightTrue) return isRightTrue; 
  // 左子树找到一个目标节点，右子树中未找到
  if (isLeftTrue || !isRightTrue) return isLeftTrue;
  // 一个都没找到
  else return null;
};

// 以上代码有一个难点就是递归终止条件，不容易想到。

// 难点1：根据递归回溯的值，有以下四种情况：
// 左右子树返回值都不为空，则当前节点就是最近祖先节点。
// 左子树返回值为空，右子树返回值不为空，返回左子树的返回值。
// 右子树返回值为空，左子树返回值不为空，返回右子树的返回值。
// 左右子树返回值都为空，说明左右子树均未找到目标值，则返回null。
// 难点2：为什么找到目标节点就立即返回该节点呢？
// 我们来分析分析，当找到一个目标节点后，此时另一个目标节点有两种情况（注意题目说，p，q两节点一定在二叉树上）：

// 在当前目标节点的子树上，即当前节点就是最近祖先节点，那么返回当前节点合理。
// 是当前节点的兄弟节点，那么返回当前节点再由回溯的返回值判断逻辑判断。
// 这里需要思考一下，怎么判断这两种情况呢？其实在难点1中的回溯四种情况中就悄悄判断了，若当前节点就是最近祖先节点，那么在回溯的过程中就会一直走难点1中2或3这两种选择，最终返回给根节点递归结束返回答案；若另一个目标节点是当前节点的兄弟节点，那么在回溯的过程中一定会走一次难点1中的情况1，之后或许再走情况2或情况3，最终也能返回最终正确答案。这里不懂得话，需要反复思考，最好能自己画一画流程，就明白了。

// 注意：这里不会出现另一个目标节点是当前目标节点的祖先节点的情况，因为如果祖先节点的话，我们会先遍历到它，并直接返回该节点了，就不会遍历到当前目标节点了。

// reference: 
// https://blog.csdn.net/weixin_46015333/article/details/124420259