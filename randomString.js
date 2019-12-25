// 随机生成指定长度的字符串
function randomString(n) {
  let str = "abcdefghijklmnopqrstuvwxyz9876543210";
  let temp = "";
  let l = str.length;
  for (let i = 0; i < n; i++) {
    temp += str.charAt(Math.floor(Math.random() * l));
  }
  console.log("temp", temp);
  return temp;
}

randomString(4);

let a = 3;
let b = ++a; // 先加 1 再赋值给 b
let c = a++; // // 先赋值给 c 再加 1
let str = "p";
str += "k"; // str = str + 'k'

console.log({ a }); // 5
console.log({ b }); // 4
console.log({ c }); // 4
console.log({ str }); // 'pk'
