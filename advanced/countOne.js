// 统计 1 ~ n 整数中出现 1 的次数
// @todo 这个方法思路还有一点不清楚
function countOne(n) {
  var factor = 1;
  let count = 0;
  let next = parseInt(n / factor);
  while (next !== 0) {
      var lower = n - next * factor
      var curr = next % 10;
      var high = parseInt(n / (10 * factor));

      if (curr === 0) {
          count += high * factor;
      } else if (curr === 1) {
          count += high * factor + lower + 1
      } else {
          count += (high + 1) * factor
      }

      factor *= 10;
      next = parseInt(n / factor);
  }
  return count;
}
// 方法二：暴力循环

function findOne(n){
	let count = 0;
	for(let i=0;i<=n;i++){
		count+=String(i).split('').filter(item=>item==='1').length
	}
	return count;
}

console.log('countOne', countOne(100)); // 21
console.log('findOne', findOne(100)); // 21