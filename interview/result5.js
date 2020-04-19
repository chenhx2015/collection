// 输出结果
var a = {},
  b = { key: "b" },
  c = { key: "c" };
a[b] = 123;
a[c] = 456;
console.log(a[b]); // 456
// 因为键名称只能是字符串，b/c单做键会调用toString得到的都是[object Object]，a[b],a[c]都等价于a["[object Object]"]，那不就是更新[object Object]这个键的值了

(function(x) {
  return (function(y) {
    console.log(x);
  })(2);
})(1);
// 1
