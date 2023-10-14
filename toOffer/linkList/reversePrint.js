// 从尾到头打印链表
// 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
// 示例 1：
// 输入：head = [1,3,2]
// 输出：[2,3,1]

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */

// 方法一：递归 递归终止条件，当前节点为空。
function reversePrint(head) {
  if(!head) return [];
	let result = reversePrint(head.next);
	result.push(head.val);
	return result;
}

// 方法二： 
// 利用栈中元素先进后出的特点，记录原链表数据，再依次弹出后存储到数组中。
function reversePrint2(head){
  let num = new Array();
  let stack = [];
  while(head){
    stack.push(head.val);
    head = head.next;
  }
  while(stack.length){
    num.push(stack.pop());
  }
  return num;
}
