// 求队列最大值
// 请定义一个队列并实现函数 max_value 得到队列里的最大值
// 要求函数 max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。
// 若队列为空，pop_front 和 max_value 需要返回 -1

// 思路：
// 利用 numQueue 保存输入的变量，
// 利用辅助队列 assQueue 维护一个递减队列，队首存放 numQueue 中的最大值。
// （1）max_value：
//   如果队列为空，返回 -1，否则返回 assQueue 队首元素。
// （2）push_back：
//   当一个新的元素 T 要进入 numQueue 时，将 assQueue 队列中比 T 小的元素出队，
//   因为此时前面比 T 小的元素都不会成为最大值。
//   然后压入 numQueue 和 assQueue。
// （3）pop_front：
//   如果队列为空，返回 -1，否则如果 numQueue 要出队的元素与 assQueue 队首元素相同，
//   则 assQueue 队首元素也要出队。

class MaxQueue {
  constructor() {
    this.numQueue = []; // 保存输入的变量
    this.assQueue = []; // 辅助队列
  }
  maxVal() {
    if(!this.assQueue.length) return -1;
    return this.assQueue[0];
  }
  pushBack(val) {
    // 这个循环的作用：assQueue 数组里面的更小的值都会被清除掉，只留下当前最大的值
    while(this.assQueue[this.assQueue.length - 1] < val) {
      this.assQueue.length -= 1;
    }
    this.numQueue.push(val);
    this.assQueue.push(val);
  }
  popFront() {
    if(!this.numQueue.length) return -1;
    let t = this.numQueue.shift();
    if(t === this.assQueue[0]) {
      this.assQueue.shift();
    }
    return t;
  }
}

let eg = new MaxQueue();
eg.pushBack(3);
eg.pushBack(7);
eg.pushBack(1);
console.log('maxVal', eg.maxVal()); // 7

