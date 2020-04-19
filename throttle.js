// 节流，所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率
// 实现方式：时间戳版 - 定时器版
// 时间戳版
function throttle(func, wait) {
  let previous = 0;
  return function () {
    let now = Date.now();
    if (now - previous > wait) {
      func.apply(this, arguments);
      previous = now;
    }
  };
}
// 使用方法如下：
// function count() {
//   console.log("count");
// }
// let th = throttle2(count, 1000);
// th();
// th();
// th();

// 定时器版
function throttle2(func, wait) {
  let timeout;
  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, arguments);
      }, wait);
    }
  };
}
// 使用方法如下：
function count() {
  console.log("count");
}
let th = throttle2(count, 1000);
th();
th();
th();

// 双剑合璧版
// 时间戳版和定时器版的节流函数的区别就是，时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候
// type 类型： 1-时间戳版 2-定时器版
function throttle3(func, wait, type) {
  if (type === 1) {
    var previous = 0;
  } else if (type === 2) {
    var timeout;
  }
  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = new Date();
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
}

// 使用方法如下：
// function count() {
//     console.log('count')
// }
// let th = throttle3(count,1000, 2)
// th()
// th()
// th()
