// 单链表的排序
// 输入：{1,3,2,4,5}
// 返回值：{1,2,3,4,5}
// 方法：分成两个链表，然后使用两个链表合并的方法

function sortInList( head ) {
  // 分成两个链表，然后使用两个链表合并的方法
  if(!head || !head.next) return head
  let slow = head, fast = head
  // preSlow始终是slow的前一个节点
  let preSlow = null
  while (fast && fast.next) {
    preSlow = slow
    slow = slow.next
    fast = fast.next.next
  }
  // 截断，head到preslow，slow到末尾
  preSlow.next = null
  // 递归调用，因为不是有序的
  let l1 = sortInList(head)
  let l2 = sortInList(slow)
  return mergeList(l1, l2)
      
  // 合并【有序】链表
  function mergeList(l1, l2){
    if(l1 === null){
      return l2
    }
    if(l2 === null){
      return l1
    }
    if(l1.val <= l2.val){
      l1.next = mergeList(l1.next, l2)
      return l1
    } else {
      l2.next = mergeList(l1, l2.next)
      return l2
    }
  }
}
  