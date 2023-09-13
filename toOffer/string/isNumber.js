// 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）
// 例如，字符串”+100”,”5e2”,”-123”,”3.1416”和”-1E-16”都表示数值。 
// 但是”12e”,”1a3.14”,”1.2.3”,”+-5”和”12e+4.3”都不是。
// Number.isNaN()用来检查一个值是否为NaN

function isNumber(s) {
  if(s === '') return false;
  let res = +s;
  if(!isNaN(res)) return true;
  return false;
}
let s1 = '+100'; // true
let s2 = '5e2';  // true
let s3 = '3.1416';  // true
let s4 = '-1E-16';  // true
let s5 = '12e';  // false
let s6 = '1a3.14';  // false
let s7 = '1.2.3';  // false
let s8 = '+-5';  // false
let s9 = '12e+4.3';  // false
let s10 = '-123'; // true

console.log('s1', isNumber(s1));
console.log('s2', isNumber(s2));
console.log('s3', isNumber(s3));
console.log('s4', isNumber(s4));
console.log('s5', isNumber(s5));
console.log('s6', isNumber(s6));
console.log('s7', isNumber(s7));
console.log('s8', isNumber(s8));
console.log('s9', isNumber(s9));
console.log('s10', isNumber(s10));