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
