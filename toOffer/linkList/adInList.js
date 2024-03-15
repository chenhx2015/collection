// 链表相加 🌿🌿🌿
// 输入：[9,3,7],[6,3]
// 返回值：{1,0,0,0}
// 方法：先进行链表反转，再做相加，注意有进位

function addInList( head1, head2 ) {
  // 链表反转
  function reverseList(head){
    let pre = null, cur = head
    while(cur){
      let next = cur.next
      cur.next = pre
      pre = cur
      cur = next
    }
    return pre
  }
  // 链表求和
  let l1 = reverseList(head1), l2 = reverseList(head2)
  let inNum = 0
  // dummy 始终不动
  let dummy = new ListNode(null)
  let p = dummy
  while(true) {
    // 求和
    let sum = inNum + (l1 ? l1.val : 0) + (l2 ? l2.val: 0)
    inNum = Math.floor(sum / 10)
    p.next = new ListNode(sum % 10)
    p = p.next
    if(l1) l1 = l1.next
    if(l2) l2 = l2.next
    if(!l1 && !l2 && !inNum){
      break
    }
  }
  return reverseList(dummy.next)
}
  