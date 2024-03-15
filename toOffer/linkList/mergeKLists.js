// 合并k个已排序的链表 🌿🌿🌿
// 输入：
// [{1,2,3},{4,5,6,7}]
// 返回值：
// {1,2,3,4,5,6,7}
// 方法：分治，两两合并

function mergeKLists(lists) {
  // 分治
  let len = lists.length
  if (len === 0) return null
  function mergeNlist(start, end) {
    if (start === end) return lists[start]
    let mid = (start + end) >> 1
    let l1 = mergeNlist(start, mid)
    let l2 = mergeNlist(mid + 1, end)
    return Merge(l1, l2)
  }
  return mergeNlist(0, len - 1)
}
// 合并两个有序链表
function Merge(l1, l2) {
  if (l1 === null) {
      return l2
  }
  if (l2 === null) {
      return l1
  }
  if (l1.val <= l2.val) {
      l1.next = Merge(l1.next, l2)
      return l1
  } else {
      l2.next = Merge(l1, l2.next)
      return l2
  }
}
