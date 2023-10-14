// 改造下面代码 使之输出 0 - 9
for (var i = 0; i < 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
// 上面这个是 过了一秒钟 一次性输出10个10

// 改造如下：
// 方法一：利用 let 块级作用域
for (let i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}

// 方法二：利用 setTimeout 的第三个参数
for (var i = 0; i < 10; i++){
	setTimeout((param) => {
		console.log(param);
    }, 1000, i)
}

// 方法三：利用立即执行函数和闭包构成独立作用域
for (var i = 0; i< 10; i++){
	(function(i) {
    setTimeout(() => {
      console.log(i);
      }, 1000)
  })(i)
}

// 方法四：利用 promise 包装 setTimeout
for (var i = 0; i< 10; i++){
	timeoutPromise(i);
}

function timeoutPromise(i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(i);
      resolve(true)
    }, 1000)
  })
}

// 方法五：利用 generate 函数
for (var i = 0; i< 10; i++){
	timeoutGenerator(i).next();
}

function* timeoutGenerator(i) {
  yield setTimeout(() => {
    console.log(i);
  }, 1000)
}

// 方法六：利用 async await 函数
// 每隔一秒输出一个数字，一直到9
async function init() {
  for (var i = 0; i< 10; i++){
    await timeoutAwait(i);
  }
}


function timeoutAwait(i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(i)
      resolve(true);
    }, 1000)
  })
}
init();