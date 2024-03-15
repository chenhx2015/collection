// 删除链表中的节点 🌿🌿🌿
// 链表的基本定义：链表的基本结构是一种具有节点的有序结合，每个节点都有若干个链接，指向其他节点；
// 其中第一个节点叫做头节点，最后一个节点叫尾节点
// 链表的每个元素由一个存储元素本身的节点和指向下一个元素的引用（指针）组成
// 它类似于火车，火车头就是头节点，火车车厢之间的连接类似于指针，火车上的乘客类似于数据。

// 🌹 数组 VS 链表
// 链表和数组的实现机制完全不同
// 一般情况下，要存储多个元素，数组可能是最常用的数据结构。
// 但是使用数组😄存储有一些缺点：
// 1.数组的创建需要申请一段连续的内存空间（一整块的内存），并且大小是固定的，所以当当前数组不能满足容量需求时，就需要扩容（一般情况下会申请一个更大的数组，比如2倍，然后将原数组中的元素复制过去）。
// 2.在数组的开头或中间位置插入数据的成本很高，需要进行大量元素的位移。

// 存储多个元素的另一个选择就是链表，但是不同于数组，链表中的元素在内存中不必是连续的空间，链表的每个元素由一个存储元素本身的节点和指向下一个元素的引用（指针）组成

// 链表有一些优势：
// 1.内存空间不是必须连续的，可以充分利用计算机的内存，实现灵活的内存动态管理；
// 2.链表不必在创建时就确定大小，并且大小可以无限延伸下去；
// 3.链表在插入和删除数据时，时间复杂度可以达到O(1)，相对数组效率高很多；

// 链表也有一些缺点：
// 1.链表访问任何一个元素的位置时，都需要从头开始访问，并且无法跳过第一个元素访问任何一个元素
// 2.链表无法通过下标直接访问元素，需要从头一个个访问，直到找到对应的元素

// 数组：增删非首尾元素时往往需要移动元素
// 链表：增删非首尾元素，不许要移动元素，只需要更改next的指向即可🌿。

// 链表的基本操作：
// 插入节点：链表的 insert（）函数来完成；有尾部插入和中间插入
// 删除节点：链表的 remove（）函数来完成；有头部删除和中间删除
// 查找节点：链表的 find（）函数来完成
// 遍历节点：链表的 traverse（）函数来完成
// 更新节点：链表的 update（）函数来完成

// 说明：js中没有链表，可模拟实现而已；js实现的链表都是单向链表 🤔️？

// 总结：🌹🌹🌹
// 插入数据和删除数据、获取索引，就会需要一个额外的 position 标志位
// 倒数第 N 个节点、环形相关 ，会需要用到 快慢指针

// 定义节点
class Node {
  // 构造函数
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class LinkedList {
  // 链表类
  // 构造函数
  constructor() {
    this.head = null;
    this.length = 0;
  }
  // 新增节点
  append(val) {
    let node = new Node(val);
    let current; // 暂存当前位置
    if(this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while(current.next) { // 遍历找到链表尾部
        current = current.next;
      }
      current.next = node; // 在链表尾部找到新节点
    }
    this.length++; // 更新链表长度
  }

  // 删除节点，并获取节点的值 🌿🌿🌿
  // 插入数据和删除数据，就会需要一个额外的 position 标志位
  removeAt(index) {
    if(index > -1 && index <= this.length) { // 预防下标越界
      let current = this.head; // 暂存当前位置
      let previous; // 暂存当前位置的前一个
      let position = 0;
      if(index === 0) {
        // 把 current.next 赋值出去
        this.head = current.next; // 要删除的是第一个位置，就得改变头指针指向
      } else {
        while(position++ < index) {
          previous = current;
          current = current.next; // 此时 current 处于 index 处
        }
        previous.next = current.next; // 改变链表结构，跳过 index 处
      }
      this.length--; // 更新链表长度
      return current.val; // 返回 index 处的值
    } else  {
      return null; // 下标越界返回空
    }
  }

  // 插入节点
  insert(index, val) {
    if(index > -1 && index <= this.length) {
      let node = new Node(val);
      let current = this.head;
      let previous;
      let position = 0;
      if(index === 0) {
        // 把 current 和 node 赋值出去
        node.next = current;
        this.head = node;
      } else {
        while(position++ < index) {
          previous = current;
          current = current.next;
        }
        // 把 current 和 node 赋值出去
        // 这两行 核心
        node.next = current;
        previous.next = node;
      }
      length++;
      return true; // 插入成功
    } else {
      return false; // 插入失败
    }
  }

  // 获取索引
  indexOf(val) {
    let current = this.head;
    let position = 0;
    while(current) {
      if(current.val === val) {
        return position;
      }
      position++;
      current = current.next;
    }
    return -1; //未找到索引
  }

  // 将链表转换成字符串
  toString() {
    let current = this.head;
    let string = '';
    while(current) {
      string += current.val + ((current.next ? ',' : ''));
      current = current.next;
    }
    return string;
  }

  // 链表长度
  size() {
    return this.length;
  }

  // 判断链表是否为空
  isEmpty() {
    return this.length === 0;
  }

  // 题目一：
  // 请编写一个函数，用于删除单链表中某个特定节点，在设计函数时需要注意，你无法访问链表的头节点head，只能直接访问要被删除的节点（题目数据保证需要删除的节点不是末尾节点）
  // 输入： head = [4, 5, 1, 9],  node = 5
  // 输出： [4, 1, 9]
  // 解题思路：题目直接给出了当前节点，只需要下一位节点覆盖掉当前节点，就可以删除元素
  // 🤔️ 好像有点问题
  // 时间复杂度O(1), 空间复杂度O(1)
  // deleteNode(node) {
  //   node.val = node.next.val;
  //   node.next = node.next.next;
  // }

  // 题目二：反转链表 🌿🌿🌿
  // 方法一：迭代
  // 时间复杂度O(n), 空间复杂度O(1)
  reverse() {
    let cur = this.head; // 正向链表的头指针
    let pre = null; // 反向链表的头指针
    while (cur) {
      const temp = cur.next; // 暂存当前节点的后续节点，用于更新正向链表
      cur.next = pre; // 将当前节点指向反向链表，这是一个建立反向链接的过程
      pre = cur; // 更新反向链表的头指针为当前已处理的节点，反向链表的该轮构建完成
      cur = temp; // 将正向链表头指针替换为暂存的节点，正向链表处理完成，开始下一轮处理
    }
    return pre;
  }

  // 题目三： 倒数第 N个 节点（两种题目）
  // 类型一：链表中倒数最后k个结点
  // 示例：
  // 给定一个链表: 1->2->3->4->5, 和 k = 2.
  // 返回链表 4->5.
  // 示例
  // 输入：{1,2,3,4,5},2
  // 返回值：{4,5}
  // 方法：快慢指针，注意特判
  findKthToTail(k) {
    // 快慢指针
    let slow = this.head, fast = this.head
    // 思路：相当于快指针先提前k个，那么快和慢之间就是 这k个数量，到了最后，也就是所要的最后k个节点
    for (let i = 0; i < k; i++) {
      // 如果快指针为空，则表示链表长度小于k，返回null
      if (fast === null) {
        return null
      }
      fast = fast.next
    }
    while (fast) {
      fast = fast.next
      slow = slow.next
    }
    return slow
  }

  // 类型二：删除链表的倒数第n个节点 🌿🌿🌿
  // 输入：{1,2},2
  // 返回值：{2}
  // 方法：快慢指针，特判删除头节点的情况
  removeNthFromEnd(n) {
    let fast = this.head, slow = this.head
    for (let i = 0; i < n; i++) {
      fast = fast.next
    }
    // 因为题目保证n一定是有效的，特判：删除头节点的情况
    if (fast === null) {
      slow = slow.next
      return slow
    }
    while (fast.next) {
      slow = slow.next
      fast = fast.next
    }
    slow.next = slow.next.next // 刚好把中间这个删除掉了 链表是跳过则删除
    // 返回头节点
    return this.head // 返回链表头节点
  }

  // 题目四：环形链表
  // 类型一：判断链表中是否有环
  // 输出：true or false
  // 方法：快慢指针
  hasCycle() {
    let head = this.head;
    if (head === null) {
      return false
    }
    // 快慢指针
    let slow = head, fast = head
    // 循环条件：快指针有下个和下下个节点
    while (fast.next && fast.next.next) {
      slow = slow.next
      fast = fast.next.next
      // 快慢指针相遇，则代表有环
      if (slow === fast) return true
    }
    return false
  }

  // 类型二：给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
  detectCycle() {
    var slow = fast = this.head;
    // 快指针遍历到末尾时结束
    while (fast && fast.next) {
      // 慢指针走一步，快指针走两步
      slow = slow.next;
      fast = fast.next.next;
      // 快慢指针相遇，则有环
      // 相遇之后，一个节点从head触发，还有一个从相遇节点出发，他俩相遇的节点就是入环点
      if (slow === fast) {
        // 指向头节点
        slow = this.head;
        // 同步向前进
        while (fast != slow) {
          fast = fast.next;
          slow = slow.next;
        }
        return fast;
      }
    }
    return null;
  };

  // 题目五：两两交换链表中的节点
  // 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。
  // 你必须在不修改节点内部的值的情况下完成本题（即只能进行节点交换）。 
  // 例子：
  // 输入：[1, 2, 3, 4]; 输出：[2, 1, 4, 3]
  swapPairs() {
    let head = this.head;
    // 只有一个元素或为空链表时
    if(head == null || head.next == null) return head;
    var temp = head.next;
    // swapPairs()表示交换对，保证两两交换
    head.next = swapPairs(temp.next);
    temp.next = head;
    return temp;
};
}

// 测试数据
let linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(3);
linkedList.append(4);
linkedList.append(7);
console.log('链表长度：', linkedList.length); // 4
console.log(linkedList.removeAt(2));
console.log('toString', linkedList.toString()); // 1,3,7
// console.log('reverse', linkedList.reverse()); // 7, 3, 1

linkedList.append(23);
linkedList.append(9);
linkedList.append(12);
console.log('toString2', linkedList.toString()); // 1, 3, 7, 23, 9, 12
// console.log('findKthToTail: ',(linkedList.findKthToTail(2))); // 9, 12 Node { val: 9, next: Node { val: 12, next: null } }
// console.log('removeNthFromEnd: ',(linkedList.removeNthFromEnd(5))) // 1, 7, 23, 9, 12

