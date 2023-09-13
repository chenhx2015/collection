// 实现一个 sleep（1000）函数
// 需要考虑一下是同步还是异步
// 定时器有准确性的问题，如果不用定时器 就用 Date.now()
// sleep实现无外乎同步和异步两种方法。
// 同步可以用for循环或者while让它在等待时间内啥也不干；
// 异步就是利用setTimeout来做定时

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
sleep(2000).then(() => {
  console.log('finish'); // 2s 之后会打印出finish
});