console.log(1);
setTimeout(() => {
  console.log(2);
}, 0);
new Promise(function(resolve) {
  console.log(3);
  resolve();
}).then(function() {
  console.log(4);
});
// 输出顺序是：1 3 4 2