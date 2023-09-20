// 二进制转 base64
// atob => ascii to binary 
// btoa 是指 转为二进制
let encodedData = btoa("this is a example");
console.log(encodedData); // dGhpcyBpcyBhIGV4YW1wbGU=

let decodeData = atob(encodedData);
console.log(decodeData); // this is a example