// 实现 (5).add(3).minus(2) 功能
// 要注意函数的返回值是什么
// 这个题目的是让实现原生 Number 类型的 加减 方法
Number.prototype.add = (num) => {
  return this + num;
}
Number.prototype.minus = (num) => {
  return this - num;
}

// 扩展
class MyNumber{
  constructor(val){
    this.val = val
  }
  valueOf() {
    console.log('valueof')
    return this.val;
  }
  // toString() {
  //   console.log('toString')
  //   return this.val;
  // }
  add(num) {
    return new MyNumber(this.val + num);
  }
  minus(num) {
    return new MyNumber(this.val - num);
  }
}

let n = new MyNumber(5)
let result= n.add(4).minus(2)
console.log('n', +n)
console.log('result %d', result) 
// result MyNumber { val: 7 } 其中 %d是占位符