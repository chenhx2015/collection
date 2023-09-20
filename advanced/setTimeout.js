// 用 setTimeout 实现 setInterval，
// 阐述实现的效果与 setInterval 的差异、
function mySetInterval() {
  mySetInterval.timer = setTimeout(() => {
      arguments[0]()
      mySetInterval(...arguments)
  }, arguments[1])
}

mySetInterval.clear = function() {
  clearTimeout(mySetInterval.timer)
}

mySetInterval(() => {
  console.log(11111)
}, 1000)

setTimeout(() => {
  // 5s 后清理
  mySetInterval.clear()
}, 5000)