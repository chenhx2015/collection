console.log("script start");

async function async1() {
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2 end");
}
async1();

setTimeout(function() {
  console.log("setTimeout");
}, 0);

new Promise(resolve => {
  console.log("Promise");
  resolve();
})
  .then(function() {
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  });

console.log("script end");

// 一句话概括 : 带async关键字的函数，它使得你函数的返回值必定是promise对象
// 也就是，如果async关键字函数返回的不是promise，会自动用Promise.resolve()包装 ；如果async关键字函数显式地返回promise，那就以你返回的promise为准
// await 在等什么？ await等的是右侧表达式的结果
// await 等到之后，做了一件什么事情？ 等到之后，对于 await 来说，分2个情况：
// 不是 Promise 对象
// 是 Promise 对象

// 如果不是promise，await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，再回到async内部，把这个非promise的东西作为await表达式的结果。

// 如果它等到的是一个promise对象，await也会暂停async后面的代码，先执行async外面的同步代码，等着Promise对象fulfilled，然后把resolve的参数作为await表达式的运行结果

// 打印结果
// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout
