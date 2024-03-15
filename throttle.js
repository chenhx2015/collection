// 节流，所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率
// 实现方式：时间戳版 - 定时器版
// 时间戳版 🌿🌿🌿
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

// 防抖和节流都是为了解决事件频繁触发的问题，但在实现原理上有些不同

// 节流原理
// 在持续触发事件时，在一定时间内只调用一次函数，如果在规定时间内，
// 再次触发此事件，则直接忽略不执行，其主要目的就是减少一段时间的触发频率

// 防抖原理
// 当持续触发事件时，在一定时间内没有再触发事件，事件才会处理函数一次，
// 如果在设定的时间到来之前，又触发了事件，则重新开启定时器（重新计时），执行最后一次触发事件。

// 节流应用场景
// DOM元素拖拽功能实现
// 计算鼠标移动距离
// 监听scroll滚动事件
// 搜索、提交等按钮功能
