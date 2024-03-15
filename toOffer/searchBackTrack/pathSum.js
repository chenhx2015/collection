// 二叉树中和为某一值的路径 🌿🌿🌿
// 给你二叉树的根节点 root 和一个整数目标和 targetSum ，
// 找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
// 叶子节点 是指没有子节点的节点。
// 递归 + 剪枝
// 可以用递归实现回溯（算法上回溯常被用递归来实现）
// https://blog.csdn.net/animatecat/article/details/124463580

function pathSum(root, target) {
  let res = [];
  function dfs(root, path, sum) {
    if(root === null) return null;
    path.push(root.val);
    // 路径中加入当前节点的值
    sum += root.val;
    // 到了叶子结点 并且整个路径的和与目标值相等，则推入结果集
    if(
      root.left === null ||
      root.right === null ||
      target === sum
    ) {
      res.push(path.slice())
    }
    // 递归的去左右子树当中查找路径
    dfs(root.left, path, sum);
    dfs(root.right, path, sum);
    // 剪枝 🤔️ 为什么不在递归之前做这个操作？
    sum -= root.val;
    path.pop();
  }
  dfs(root, [], 0);
  return res;
}

