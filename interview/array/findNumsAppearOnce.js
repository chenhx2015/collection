// 数组中只出现一次的数字
// 一个整型数组里除了两个数字之外，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。

// 思路
// 第一种：indexOf() 和 lastIndexOf(),只要两个相等，就是只出现一次的数。
// 第二种：使用 map 记录下每个数的次数，占空间。
// 第三种：根据异或结果中 1 所在的二进制位数，把数组中数分成两种不同类别，分别异或得出结果。

// 方法一：
function findNumsAppearOnce1(array) {
  // return list ，比如 [a, b] 其中 ab 是出现一次的两个数
  let res = [];
  for(let i = 0; i < array.length; i++) {
    if(array.indexOf(array[i]) === array.lastIndexOf(array[i])) {
      res.push(array[i]);
    }
  }
  return res;
}

console.log('findNumsAppearOnce1', findNumsAppearOnce1([1, 2, 4, 3, 5, 4, 1])); // [2, 3, 5]

// 方法二：
function findNumsAppearOnce2(array) {
  const map = {};
  let res = [];
  for(let i = 0; i < array.length; i++) {
    if(!map[array[i]]) {
      map[array[i]] = 1;
    } else {
      map[array[i]]++
    }
  }
  for(let j = 0; j < array.length; j++) {
    if(map[array[j]] === 1) {
      res.push(array[j]);
    }
  }
  return res;
}

console.log('findNumsAppearOnce2', findNumsAppearOnce2([1, 2, 4, 3, 5, 4, 1])); // [2, 3, 5]

// 方法三 🤔️有一点点问题 比如有多个出现了两次的元素时 结果就不对了
// 异或（eor）是一个数学运算符。它应用于逻辑运算。
// 两个相等的数异或为0；两个值不相同，则异或结果为1；一个不为0的数与0异或为这个数本身；
function findNumsAppearOnce3(array) {
  let ans = 0;
  for (const item of array) {
    ans^=item;
  }
  return ans;
}

console.log('findNumsAppearOnce3', findNumsAppearOnce3([1, 2, 4, 3, 5, 4, 1])); // 4

// 方法四：和方法二差不多
var singleNumber = function(nums) {
  let map = new Map();
  let res = [];
   for(let i = 0; i<nums.length;i++){
       if(map.has(nums[i])){
           map.set(nums[i],map.get(nums[i])+1);
       }else{
           map.set(nums[i],1)
       }
   }
   for(let [key,value] of map.entries()){
       if(value===1){
          //  return key 这样只能找出第一个 2, 要改成下面的这一行才行
          res.push(key);
       }
   }
  return res;
};

console.log('singleNumber', singleNumber([1, 2, 4, 3, 5, 4, 1])); // [2, 3, 5]
