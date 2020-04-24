// 编程题
// str = '1, 2, 3, 5, 7, 8, 10'  => "1-3, 5, 7-8, 10"
let str = "1, 2, 3, 5, 7, 8, 10";

function type(str) {
  let arr = str.split(", ");
  let result = []; // 最后的一个大数组
  let min = parseInt(arr[0]);
  let max = min;
  let out = "";

  for (let i = 1; i < arr.length; i++) {
    let temp = parseInt(arr[i]);
    if (temp - max > 1) {
      if (min === max) {
        result.push(min);
        out += min + ",";
      } else {
        result.push(min, max);
        out += min + "-" + max + ",";
      }
      min = temp;
      max = temp;
    } else {
      max = temp;
    }
  }

  if (max === min) {
    result.push(max);
    out += max;
  }
  // result.push(min, max);
  console.log(out);
  return result;
}
let result = type(str);
console.log({ result });
