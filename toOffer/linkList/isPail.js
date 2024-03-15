// 判断一个链表是否为回文结构 🌿🌿🌿
// 输入：{1,2,2,1}
// 返回值：true
// 方法：把链表变成数组，然后再比较

function isPail( head ) {
  // 转数组
  const newArr = []
  while(head){
    newArr.push(head.val) // 把值一个一个放入到数组里面
    head = head.next
  }
  // 对数组进行判断
  for(let i = 0, j = newArr.length - 1; i <= j; i ++, j--){
    if(newArr[i] !== newArr[j]){
      return false
    }
  }
  return true
}
  