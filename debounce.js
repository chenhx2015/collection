// 防抖 🌿🌿🌿，所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
// 实现分为：非立即执行- 延迟执行
// 思路：返回一个新的函数来指定在多少秒后再执行 func函数（即传入的函数）
// 延迟执行具体思路：执行第一次则赋个值给定时器timeout, 同时设定秒数之后才会真正执行这个函数，如果定时器被赋值过，则清除定时器，重新计时
// 区别：防抖是控制次数，节流是控制频率
function debounce(func, wait) {
  let timeout;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
}
// function count() {
//   console.log("llll", new Date());
// }

// let newCount = debounce2(count, 1000);
// // newCount.apply(window);
// newCount();
// newCount();
// newCount();

// 防抖 - 立即执行
// 立即执行具体思路：如果定时器被赋值过，则先清空定时器，下次重新计时，如果是定时器是未赋值过的，则执行函数，同时在给定秒数之后再清空定时器
function debounce2(func, wait) {
  let timeout;
  return function () {
    if (timeout) clearTimeout(timeout);
    let callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callNow) func.apply(this, arguments);
  };
}

// 双剑合璧版
function debounce3(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

// 扩展
// 前端如何做接口防刷？（基本就是后端工程师限制用户的接口调用次数）
// 刷接口直接走脚本，前端限制有一定作用，但不大
// 1. 防抖+节流 (这个基本没用，刷的脚本肯定不会通过点击按钮来刷) ❌
// 2. 利用 axios 的请求拦截，把最近的一些请求地址加进数组, 请求前拦截器 判断一定时间内这个地址是否再出现 来控制请求频率
// 3. http 请求头信息校验 (例如 host，User-Agent，Referer)
// 4. 人机验证，验证码，短信验证码，滑动图片形式
// 5. 限制 IP

// 防抖和节流都是为了解决事件频繁触发的问题，但在实现原理上有些不同

// 原理
// 当持续触发事件时，在一定时间内没有再触发事件，事件才会处理函数一次，
// 如果在设定的时间到来之前，又触发了事件，则重新开启定时器（重新计时），执行最后一次触发事件。

// 防抖使用场景
// scroll事件滚动
// 浏览器窗口的缩放resize事件
// 搜索框输入查询的时候
// 表单验证
// 按钮的提交事件