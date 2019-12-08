// 模块中的函数
// 版本1
export function thirdFunction(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 0);
  });
}

// 版本2
// function thirdFunction(url) {
// return Promise.resolve(url);
// }

//版本3
function thirdFunction(url) {
  return url;
}
