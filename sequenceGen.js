// 生成某个范围内的数组，并且可以指定间隔为多少
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
let result = range(0, 4, 1);
console.log({ result }); // [ 0, 1, 2, 3, 4 ]

let result2 = range(1, 10, 2);
console.log({ result2 }); // [ 1, 3, 5, 7, 9 ]

let result3 = range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) =>
  String.fromCharCode(x)
);
console.log({ result3 });
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let result4 = range("A".charCodeAt(0), "Z".charCodeAt(0), 3).map((x) =>
  String.fromCharCode(x)
);
console.log({ result4 });
// [ 'A', 'D', 'G', 'J', 'M', 'P', 'S', 'V', 'Y' ]
// charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数
