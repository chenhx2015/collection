// 修改代码, 使之输出 0 到 99，或者 99 到 0
// 这个输出的是 100 个无序的数字
function print(n) {
  setTimeout(() => {
    console.log(n);
  }, Math.floor(Math.random() * 1000));
}
for (var i = 0; i < 100; i++) {
  print(i);
}

// 方法一：
function print(n) {
  setTimeout(() => {
    console.log(n);
  }, i);
}
for (var i = 0; i < 100; i++) {
  print(i);
}

// 方法二：
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
