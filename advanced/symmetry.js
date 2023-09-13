// 求对称数
// 打印出 1 - 10000 之间的所有对称数
// 例如：121、1331 等
// 没必要去遍历 10000 个数字 性能太差
// @todo 可以继续再思考一下这个思路

function symmetry() {
  let result=[]
  for(let i=1;i<10;i++){
      result.push(i)
      result.push(i*11)
      for(let j=0;j<10;j++){
          result.push(i*101+j*10)
          result.push(i*1001+j*110)
      }
  }
  return result;
}

console.log('symmetry', symmetry());

