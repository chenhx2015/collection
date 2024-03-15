/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */

// 题目：删除链表中的某个元素
// 给你一个链表的头节点 head 和一个整数 val ，
// 请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。
// 输入：head = [1,2,6,3,4,5,6], val = 6
// 输出：[1,2,3,4,5]

var removeElements = function (head, val) {
  let header = new ListNode(-1);
  header.next = head;
  let cur = header;
  while (cur.next != null) {
    if (cur.next.val == val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return header.next;
};