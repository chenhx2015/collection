// 链表的奇偶重排
// 输入：{1,2,3,4,5,6}
// 返回值：{1,3,5,2,4,6}
// 方法：计数，为奇数时插入到奇数链表

function oddEvenList(head) {
  let p = head
  // 奇偶链表的虚拟头结点
  let l1 = new ListNode(-1),
      l2 = new ListNode(-1)
  let p1 = l1,
      p2 = l2
  // 计数
  let count = 1
  while (p) {
    // 当为奇数时，插入到奇链表，且奇链表节点往后移
    if (count % 2 === 1) {
        p1.next = p
        p1 = p1.next
    } else {
        p2.next = p
        p2 = p2.next
    }
    p = p.next
    count++
  }
  // 切断偶链表
  p2.next = null
  p1.next = l2.next
  return l1.next
}
