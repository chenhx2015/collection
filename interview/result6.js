const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);

// 输出： 1 2 4 ，不输出 3 ，因为 promise 状态一直是pending 