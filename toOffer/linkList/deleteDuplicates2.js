// 删除有序链表中重复的元素-II 🌿🌿🌿
// 输入：{1,2,2}
// 返回值：{1}
// 本题和 I 的区别：本题删除所有重复的数字
// 方法：当当前元素的值与后一节点的值一致时，记录后一节点，移动后一节点直至与当前值不同

function deleteDuplicates(head) {
  // 删除重复的元素
  let dummy = new ListNode(-9999)
  dummy.next = head
  let pre = dummy,
    cur = head
  while (cur && cur.next) {
    if (cur.val === cur.next.val) {
      let temp = cur.next
      // 重复的元素全部删除
      while (temp && temp.val === cur.val) {
        temp = temp.next
      }
      pre.next = temp
      cur = temp
    } else {
      // 如果不相等，则 pre 和 cur 都往后移
      pre = pre.next
      cur = cur.next
    }
  }
  return dummy.next
}
