// 题目： 给两个单链表的头节点 headA 和 headB ，
// 请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
var getIntersectionNode = function(headA, headB) {
  if(headA == null || headB == null) return null;
  var hA = headA, hB = headB;
  while(hB !== hA) {
    hA = hA == null ? headB : hA.next;
    hB = hB == null ? headA : hB.next;
  }
  return hB;
};