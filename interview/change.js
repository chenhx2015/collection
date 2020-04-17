// 修改代码, 使之输出 0 到 99，或者 99 到 0
// function print(n) {
//   setTimeout(() => {
//     console.log(n);
//   }, Math.floor(Math.random() * 1000));
// }
// for (var i = 0; i < 100; i++) {
//   print(i);
// }

function print(n) {
  setTimeout(
    () => {
      console.log(n);
    },
    1,
    Math.floor(Math.random() * 1000)
  );
}
for (var i = 0; i < 100; i++) {
  print(i);
}
