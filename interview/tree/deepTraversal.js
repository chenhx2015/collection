// 二叉树 深度优先遍历 （DFS）
function deepTraversal1(node, nodeList = []) {
  if (node !== null) {
    nodeList.push(node);
    let children = node.children;
    for (let i = 0; i < node.length; i++) {
      deepTraversal1(children[i], nodeList);
    }
  }
  return nodeList;
}

// 非递归
let deepTraversal3 = (node) => {
  let stack = [];
  let nodes = [];
  if (node) {
    // 推入当前处理的 node
    // 思路：先pop出到nodes里面去，再把pop的孩子放到stack，然后继续下一次pop
    // 反的加进去 顺的取出来
    // 处理尾部
    stack.push(node);
    while (stack.length) {
      let item = stack.pop(); // 删除最后一个元素，返回该元素
      let children = item.children;
      nodes.push(item);
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
  return nodes;
};

// 相关知识点
// push()方法可以在数组的末属添加一个或多个元素
// shift()方法把数组中的第一个元素删除
// unshift()方法可以在数组的前端添加一个或多个元素
// pop()方法把数组中的最后一个元素删除
