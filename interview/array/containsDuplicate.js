// 重复元素 🤔️ 复杂度怎么计算出来的
// 给一个整数数组nums。如果任一值在数组中出现至少两次，返回true；如果数组中每个元素互不相同，返回false

// 方法一：
function containsDuplicate1(nums) {
  if (nums.length < 1) return false;
  nums.sort((a, b) => a - b); // a - b 升序
  const len = nums.length;
  for(let i = 0; i < len; i++) {
    if (nums[i] === nums[i+1]) {
      return true;
    }
  }
  return false;
};
console.log(containsDuplicate1([1, 2, 3])); // false
console.log(containsDuplicate1([1, 1, 2, 3])); // true

// 以上复杂度分析
// 时间复杂度
// O(NlogN)，其中 N 为数组的长度。

// 需要对数组进行排序。

// 空间复杂度
// O(logN)，其中 N 为数组的长度。


// 方法二：哈希表
function containsDuplicate2(nums) {
  let set = new Set();// 使用哈希表缓存已知元素
    for( let num of nums){
    // 如果数字已存在于哈希表中，表示出现重复，返回true
        console.log(num)
        if(set.has(num)){
            return true
        }
    // 将遇到的数字缓存在哈希表
        set.add(num)
    }
    // 正常退出循环，表示没有重复，返回false
    return false
}

console.log(containsDuplicate2([1, 2, 3])); // false
console.log(containsDuplicate2([1, 2, 2, 3])); // true

// 时间复杂度
// O(N)，其中 N 为数组的长度。
// 空间复杂度
// O(N)，其中 N 为数组的长度。
