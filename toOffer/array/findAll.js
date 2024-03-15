// 二维数组排列组合 🌿🌿🌿
// input: [['A', 'B'], ['a', 'b'], [1, 2]]
// output: 'Aa1' 'Aa2' 'Ab1' 'Ab2' 'Ba1' 'Ba2' 'Bb1' 'Bb2' 
// 思路：
// 编程，首先要分析规律，有了规律之后要做的就是用代码将这种规律实现就好了！！！！！

// 分析一下，将计算过程拆解为两两相乘的过程

// 首先计算[A, B] * [a, b]，得到结果[Aa, Ab, Ba, Bb]
// 然后计算[Aa, Ab, Ba, Bb] * [1, 1]，
// 得到最终结果[Aa1, Aa2, Ab1, Ab2, Ba1, Ba2, Bb1, Bb2]
// 如果还有后续数组，重复上述过程

// 用递归实现，关键的计算公式是：
// 计算（已计算的结果 * 当前结果）
// 然后再实现拼接
// 关键还是要实现递归规律

const getResult = (arr1, arr2) => {
  if(!Array.isArray(arr1) || !Array.isArray(arr2) ) return;
  if (arr1.length === 0) return arr2;
  if (arr2.length === 0) return arr1;
  let result = [];
  for(let i = 0; i < arr1.length; i++) {
    for(let j = 0; j < arr2.length; j++) {
      result.push(`${arr1[i]}${arr2[j]}`)
    }
  }
  return result;
}

function findAll(arr) {
  return arr.reduce((total, current) => {
    return getResult(total, current) 
  }, []);
}

// test
let testArr = [['A', 'B'], ['a', 'b'], [1, 2]];
console.log('findAll', findAll(testArr))
// findAll [
//   'Aa1', 'Aa2',
//   'Ab1', 'Ab2',
//   'Ba1', 'Ba2',
//   'Bb1', 'Bb2'
// ]
