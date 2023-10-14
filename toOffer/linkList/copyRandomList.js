// 请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，
// 每个节点除了有一个 next 指针指向下一个节点，
// 还有一个 random 指针指向链表中的任意节点或者 null
// 知识点：回溯，哈希，深拷贝

// 注意坑：本题中因为随机指针的存在，
// 当我们拷贝节点时，当前节点的随机指针指向的节点 可能还没创建

// 例子
// 输入：head = [[1,1],[2,1]]
// 输出：[[1,1],[2,1]]

// 输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
// 输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]

// 输入：head = []
// 输出：[]

//实现思路：
// 使用 Map 数据结构来进行赋值
// 键存放指向节点的指针
// 值存放 new Node
// 第一次循环构建 Map 数据结构
// 第二次循环给值的 next 域和 random 域进行赋值
// 记住一点：这里的值的 next 域和 random 域不能指向 node 的节点，
// 只能指向 map 数据结构中的值的节点

function copyRandomList(head) {
  // 首先创建一个 Map，键用来存储 head 指针域，值用来存储复制的节点
  let node = head;
  const m = new Map();
  while(node){
    m.set(node, new Node(node.val));
    node = node.next; // 遍历下一个node
  }
  // 到这里，链表的键已经存放的是指针，
  // 值存放的是 next 域和 random 域为空，值为指针所指的 val
  // 让 node 重新指向 head
  node = head;
  while(node) {
    m.get(node).next = node.next ? m.get(node.next) : null;
    m.get(node).random = node.random ? m.get(node.random) : null;
    node = node.next;
  }
  node = head;
  return m.get(node);
}


