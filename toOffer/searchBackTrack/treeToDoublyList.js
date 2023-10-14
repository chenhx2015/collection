// 二叉搜索树转换为双向循环链表
// 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。
// 要求不能创建任何新的节点，只能调整树中节点指针的指向。

// 思路：
// 【信息1】这是一颗二叉搜索树，那么这个二叉树就具有Node.left.val < Node.val < Node.right.val的特点。
// 【信息2】要构建一个排序的 循环的 双向链表 。

// 那么针对“信息1”，我们可以采用中序遍历的方式对二叉搜索树种的各个节点执行遍历操作。
// 那么对于中序遍历，我们采用的代码结构如下所示：
// void dfs(Node node) {
//     ... ...
//     dfs(node.left); // 处理左子节点
//     node // 处理当前节点
//     dfs(node.right); // 处理右子节点
//     ... ...
// }

// 那么针对“信息2”，我们需要一个循环的双向链表，
// 那么这个循环就需要我们创建两个指针了，
// 即：头指针 Node head 和尾指针 Node cur
// （在程序执行过程中，cur表示正在处理的那个节点，
// 所以当整个二叉搜索树都遍历完毕后，cur 就是双向链表中最末尾的那个节点了）。
// 那么，当整个搜索二叉树都遍历完毕之后，我们就可以通过执行：
// head.left = cur 和 cur.right = head来将双向链表的收尾相连。
// https://blog.csdn.net/qq_26470817/article/details/129346439
// https://blog.csdn.net/vcj1009784814/article/details/124316500

function treeToDoublyList(root) {
  let head = null; // 头指针 is tree node
  let cur = null; // 尾指针
  
  if(root === null) return root;
  // 中序遍历完 互相指向设置好
  dfs(root);
  // 前后串连 收尾
  head.left = cur;
  cur.right = head;
  return head;

  function dfs(node) {
    if(node === null) return;
    // 进行中序遍历 左根右
    dfs(node.left);
    // 第一个没有左儿子节点，就是最左侧的节点，链表的第一个节点
    if(head === null) {
      head = cur = node;
    } else {
      // 对当前节点进行处理，
      // 把当前节点node 和 cur 进行链表的链接上，即left right 的处理，
      // 并把cur挪到node的位置
      // cur --- node node 为当前节点
      cur.right = node;
      node.left = cur;
      cur = node; // cur 挪到 node 的位置
    }
    dfs(node.right);
  }
}
