// 扑克牌问题
// 有一堆扑克牌，将牌堆第一张放到桌子上，
// 再将接下来的牌堆的第一张放到牌底，如此往复；

// 最后桌子上的牌顺序为： (牌底) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌顶)；
// 问：原来那堆牌的顺序，用函数实现。

function poke(arr) {
  let i = 1
  let out = []
  while (arr.length) {
    if (i % 2) {
      out.push(arr.shift())
    } else {
      arr.push(arr.shift())
    }
    i++
  }
  return out
}   
    

function reverse(arr) {
  let i = 1
  let out = []
  while (arr.length) {
    if (i % 2) {
      out.unshift(arr.pop())
    } else {
      out.unshift(out.pop())
    }
    i++
  }
  return out
}

console.log('poke', poke([1,2,3,4,5,6,7,8,9,10,11,12,13 ]));
// [1, 3, 5,  7, 9, 11, 13, 4, 8, 12, 6,  2, 10]
console.log('reverse', reverse([1,2,3,4,5,6,7,8,9,10,11,12,13 ]));
// [1, 12, 2,  8, 3, 11, 4,  9, 5, 13, 6, 10, 7]