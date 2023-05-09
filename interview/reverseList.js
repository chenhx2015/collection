// 反转单链表
// 概念：链表是表示一系列节点的数据结构，其中每个节点包含两条信息：节点的值和指向列表中下一个节点的指针/引用。链表的开头称为头，链表末尾的节点称为尾，指向空值；null。
// 好处：与数组相比，链表的主要好处是更容易在列表中插入或删除节点。另一方面，不允许随机访问数据，因为与数组不同，链表没有索引。

const reverseList = (head) => {
  let prev = null;
  let next = null;
  let current = head;

  while(current !== null) {
    next = current.next; 
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

// 方法二：
var reverseList2 = function(head) {
  // 判断下变量边界问题
  if (!head || !head.next) return head
  // 初始设置为空，因为第一个节点反转后就是尾部，尾部节点指向 null
  let pre = null
  let current = head
  let next
  // 判断当前节点是否为空
  // 不为空就先获取当前节点的下一节点
  // 然后把当前节点的 next 设为上一个节点
  // 然后把 current 设为下一个节点，pre 设为当前节点
  while(current) {
      next = current.next
      current.next = pre
      pre = current
      current = next
  }
  return pre
};