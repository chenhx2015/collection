// 使用 setTimeout 实现 setInterval
var timeWorker = {}
var mySetInterval= function(fn, time) {
  // 定义一个key，来标识此定时器
  var key = Symbol();
  // 定义一个递归函数，持续调用定时器
  var execute = function(fn, time) {
    timeWorker[key] = setTimeout(function(){
      fn();
      execute(fn, time);
    }, time)
   }
  execute(fn, time);
  // 返回key
  return key;
}
var myClearInterval = function(key) {
  if (key in timeWorker) {
    clearTimeout(timeWorker[key]);
    delete timeWorker[key];
  }
}

// test
let time1 = mySetInterval(() => {console.log(111)}, 3000);
let time2 = mySetInterval(() => {console.log(222)}, 3000);

setTimeout(() => {
  myClearInterval(time2);
}, 4000)

