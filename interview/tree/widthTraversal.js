// 二叉树 广度优先遍历 （BFS）
let widthTraversal2 = node => {
  let nodes = [];
  let stack = [];
  if (node) {
    // 思路：先 shift 出到 nodes 里面去，再把 shift 的孩子放到stack，然后继续下一次 shift
    // 走一个就把该 item 的孩子弄进来数组，往后 push，所以也不影响广度优先（刚好是广度优先的顺序）
    // 处理头部
    stack.push(node);
    while (stack.length) {
      let item = stack.shift();
      let children = item.children;
      nodes.push(item);
      // 队列，先进先出
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i]);
      }
    }
  }
  return nodes;
};
