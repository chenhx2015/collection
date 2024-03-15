// 删除有序链表中重复的元素-I 🌿🌿🌿
// 输入：{1,1,2}
// 返回值：{1,2}
// 输入：
// {1,1,2}
// 复制
// 返回值：
// {1,2}
// 方法：有下一个节点且与下一个节点的值相同，有下下个节点的情况下，则指向下下个节点，否则指向null

function deleteDuplicates(head) {
  // write code here
  let cur = head
  while (cur) {
    // 如果有下一个节点且与下一个节点的值相同
    if (cur.next && cur.val === cur.next.val) {
      // 如果有下下个节点，则直接指向下下个节点，否则直接指向null
      if (cur.next.next) {
        cur.next = cur.next.next
      } else {
        cur.next = null
      }
    } else {
      // 不相同则指向下一个节点
      cur = cur.next
    }
  }
  return head
}
