async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
function async2() {
  // 去掉了 async 关键字
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

// 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值（相当于直接Promise.resolve）
