// 合并乱序区间
// var p = [
//   [1, 100],
//   [80, 99],
//   [101, 250],
//   [300, 400],
//   [350, 600],
//   [600, 800]
// ];

var p = [
  [1, 100],
  [80, 99],
  [82, 250],
  [300, 400],
  [402, 600],
  [601, 800]
];

console.log(p);

var re = [];
var tmp = p[0];
re.push(tmp);
for (var i = 1; i < p.length; i++) {
  if (tmp[1] >= p[i][0] && tmp[1] < p[i][1]) {
    tmp[1] = p[i][1];
  } else if (tmp[1] < p[i][0]) {
    re.push(p[i]);
    tmp = p[i];
  }
}
console.log(re);
