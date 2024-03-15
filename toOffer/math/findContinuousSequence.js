// 和为s的连续正数序列 🌿🌿🌿
// 输入一个正整数 target ，
// 输出所有和为 target 的连续正整数序列（至少含有两个数）。
// 序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

// 示例 1：
// 输入：target = 9
// 输出：[[2,3,4],[4,5]]

// 示例 2：
// 输入：target = 15
// 输出：[[1,2,3,4,5],[4,5,6],[7,8]]

// 方法一：
// 思路：我们可以使用滑动窗口的思路来解决，整体来用for循环整体的次数，
// 用whie（sum>target）来控制窗口的大小
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function (target) {
  let index = target % 2 === 0 ? target / 2 : (target / 2 | 0) + 1
  let res = []
  let temp = []
  let sum = 0
  for (let i = 1; i <= index; i++) {
    temp.push(i)
    sum = sum + i
    while (sum > target) {
      sum -= temp[0]
      temp.shift()
    }
    if (sum === target) {
      temp.length >= 2 && res.push([...temp])
    }
  }
  return res;
};

console.log('res way1:', findContinuousSequence(9));
// [[2,3,4],[4,5]]

// 方法二：
// 分析：
// 连续整数相加的和等于中间值mid × 整数个数 n
// 若个数为奇数，则中间值 mid 为整数。（如上例中 1+2+3+4+5 = 3 × 5）
// 或个数为偶数，则中间值mid 为 整数 + 0.5 （如上例中 7+8 = 7.5 × 2）
// 因此，已知和为s，若除以奇数个数n，能整除，则可以转为n个连续数相加；若除以偶数个数n，值为整数+0.5，则可以转为哪个连续数相加
// 可以让n从2开始递增，用s除以n，根据结果判断是否可以转为连续数相加。
// 确定边界条件（n要增加到多少？）：s/n的值是一系列连续数的中间值，n是这一系列数的个数，因此这一列数的最小的值为：Math.ceil(s/n-n/2)，最小值要＞0，因此边界条件Math.ceil(s/n-n/2) > 0
// 由于n从2开始递增，得到的序列是从大开始排序的，因此需要倒序输出；

function FindContinuousSequence(sum){
  let res = []; // 保存结果
  let i = 2; //保存连续整数的个数
  let even = false; //判断i是奇数还是偶数
  let remainder = sum % i; //保存余数
        
  //边界条件：最小值＞0
  while(Math.ceil(sum/i - i/2) >0){       
    //i是奇数时，要求sum能整除i
    if(even && remainder === 0) {
      let temp = []; //保存连续整数
      //i个连续整数，因此j<i，从最小值逐渐+j
      for (var j = 0; j < i; j++) {
        temp.push(Math.ceil(sum/i-i/2)+j);
      }
      res.push(temp);
    } else if (!even && remainder === i/2){  //i是偶数是，要求余数是除数的一半
      let temp = [];
      for (var j = 0; j < i; j++) {
          temp.push(Math.ceil(sum/i-i/2)+j);
      }
      res.push(temp);
    }
    even = !even;
    i++;
    remainder = sum % i;
  }
  // 因为res中从大到小排列序列，因此需要通过reverse()实现倒序。
  return res.reverse();  
}

// 方法三：
function FindContinuousSequence(sum)
{
  let i = 1;
  let temp = new Array(sum-1).fill(1).map(x=>i++)
  let res = [];
  let left = 0;
  let right = 0;
  let count = 0;
  while(right!=sum){
    if(count<sum){
        count += temp[right];
        right++;
    }
    else if(count==sum){
        res.push(temp.slice(left, right));
        count -= temp[left];
        left++;
    }else{
        count -= temp[left];
        left++;
    }
  }
  return res;
}