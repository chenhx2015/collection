// 阶乘
// 方法一：递归
/*
* 阶乘
* @param {number} n 需要求的阶乘
* @return {number} 阶乘值
*/
function factorialize1(n){
	if(typeof n !== 'number') throw new Error('参数必须为整整')
	if(n === 1) return 1;
	// 建议不要使用 arguments.callee，目前已经废弃了。
	return n * factorialize1(n - 1);
}

// 上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。
// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）


// 方法二：ES6 尾调用优化
function factorialize2(n, total = 1){
	if(typeof n !== 'number' || typeof total !== 'number') throw new Error('参数必须为整数')
	if(n === 1) return total;
	return factorialize2(n - 1, n * total)
	// f(3) => f(2, 3 * 2) => f(1, 6) => 6
}

// ES6尾调用优化但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
// 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。


// 方法三： 循环
function factorialize3(n){
	if(typeof n !== 'number') throw new Error('参数必须为整整')
	if(n === 1) return 1;	
	let total = 1;
	while(n>1){
		total = n * total;
		n--;
	}
	return total;
}
