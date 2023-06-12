async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// 补充知识点：setTimeout、Promise、Async/Await 的区别？
// 三个都是异步处理的解决方案
// setTimeout是异步执行函数 , 当js主线程运行到此函数时,不会等待settimeout中的回调函数 ,会直接进行settimeout下面的语句(尽管setTimeout的延迟时间为0时) 
// 当执行完当前事件循环的时候,settimeout中的回调会在下次(或者某一个)事件循环中被执行
// Promise 本身是同步的立即执行函数,当在执行体中执行resolve()或者reject的时候,此时是异步操作
// 会先执行then/catch(异步执行)等,等主栈完成后,才会去执行resolve()/reject中的方法；
// async函数返回一个promise对象；async 函数需要等待await后的函数执行完成并且有了返回结果（Promise对象）之后，才能继续执行下面的代码。
// await通过返回一个Promise对象来实现同步的效果。

// 🌿 🌺 注意：在定时器的时间到了之后，把回掉函数放到执行异步队列中去。如果此时这个队列已经有很多任务了，那就排在他们的后面；也就解释了下面这个扩展问题
// 扩展：为什么setTimeOut为什么不能精准的执行
// setTimeOut执行需要满足两个条件：
// 1. 主进程必须是空闲的状态，如果到时间了，主进程不空闲也不会执行你的回掉函数
// 2. 这个回掉函数需要等到插入异步队列时前面的异步函数都执行完了，才会执行
// 总结：主进程空闲 & 队列里面前面没有其他的异步任务了

// 解析：
// 这题主要是考察这三者在事件循环中的区别，事件循环中分为宏任务队列和微任务队列
// 其中settimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行
// promise.then里的回调函数会放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行；
// async函数表示函数里面可能会有异步方法，await后面跟一个表达式，async方法执行时，遇到await会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。

// 🌿 🌺 js中的任务，大致分为2类，一类是同步任务，另一类是异步任务。而异步任务，又分为宏任务和微任务，这两个任务是两个队列，所以是先进先出的。
// 同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。
// 异步任务指的是，不进入主线程、而进入"任务队列"的任务，只有等主线程任务执行完毕，"任务队列"开始通知主线程，请求执行任务，该任务才会进入主线程执行

// 大总结：js 的任务的分类（具体还有例子），以及异步处理方案