// 模块中的函数
export function thirdFunction(url, result) {
  // 版本1 异步
  setTimeout(result, 0);
}

// function thirdFunction(url, result) {
//   //版本2，变成同步
//   result()
// }
