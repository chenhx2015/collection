// 合并两个有序链表 🌿🌿🌿
// 方法一；递归
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var mergeTwoLists = function(list1, list2) {
  // 进行判空的处理
  if(list1 == null) return list2;
  if(list2 == null) return list1;
  
  // 进行值的比较
  if (list1.val <= list2.val){
    list1.next = mergeTwoLists(list1.next,list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1,list2.next);
    return list2;
  }
};

// 方法二：迭代
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var mergeTwoLists = function(list1, list2) {
  // 设置哨兵节点(虚拟头节点)，将较小的节点连接到这个哨兵节点，最后返回prehead.next即可。
  let preHead = new ListNode(-1);
  // 设置一个pre指针，用于连接链表 
  let pre = preHead;
  // 开始遍历，比较两者大小。当两个链表均不空的时候，进行值的比较
  while(list1 && list2){
    if(list1.val <= list2.val){
      pre.next = list1;
      list1 = list1.next;
    }else{
      pre.next = list2;
      list2 = list2.next;
    }
    // 移动pre的指针
    pre = pre.next;
  }
  
  // 当一开始其中一个链表为空的时候，或者一直遍历直到其中一个短的链表为空的时候，直接把非空的另外一个链表添加到pre.next
  if (list1 == null){
    pre.next = list2;
  }else{
    pre.next = list1;
  }
  return preHead.next;
};

