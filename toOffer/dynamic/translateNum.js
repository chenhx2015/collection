// 把数字翻译成字符串
// 给定一个数字，我们按照如下规则把它翻译为
// 字符串：0 翻译成 “a” ，1 翻译成 “b”，……，
// 11 翻译成 “l”，……，25 翻译成 “z”。
// 一个数字可能有多个翻译。请编程实现一个函数，
// 用来计算一个数字有多少种不同的翻译方法。

// 示例 1:
// 输入: 12258
// 输出: 5
// 解释: 12258有5种不同的翻译，
// 分别是"bccfi", "bwfi", "bczi", "mcfi"和"mzi"

// 可以用递归的思路解答，主要分两种情况考虑。

// 当前字符和下一个字符组成的两位数是否在10-25范围内，如果在，则可以翻译成一个字母，反之则不能。

// 以这一条件可以分情况讨论，如果连续两个字符可以翻译成一个字母，则对应两种翻译方法，反之则是一种。

// 然而，这一思路存在重复的子问题，以12258为例。

// 翻译12、258和翻译1、2、258这两种情况存在重复子问题：翻译258。

var translateNum = function(num) {
  const str = num.toString();
  var length = str.length;
  if(length<=0)
      return 0;
  return dfs(str,0);
};
var dfs = function(str,pointer){
  if(pointer >= str.length-1) return 1;
  var tmp = Number(str[pointer]+str[pointer+1]);
  if(tmp>=10 && tmp<=25){
      return dfs(str,pointer+1)+dfs(str,pointer+2);
  }else{
      return dfs(str,pointer+1);
  }
}
// 上述重复子问题一般在有两种翻译方法的时候存在，可以考虑通过增加备忘录的方式来进行算法优化。
// 如：创建数组memo，记录对应索引之后字符的翻译方法种类。在执行过程中先判断是否已经计算过，以此提高算法效率。
// 优化后的算法：

var translateNum = function(num) {
  const str = num.toString();
  var length = str.length;
  const memo = new Array(length);
  memo[length-1] = 1;
  var dfs=(str,pointer,memo)=>{
    if(pointer >= str.length-1) return 1;
    var tmp = Number(str[pointer]+str[pointer+1]);
    if(memo[pointer]) return memo[pointer];
    if(tmp>=10 && tmp<=25){
        memo[pointer] = dfs(str,pointer+1,memo)+dfs(str,pointer+2,memo);
    }else{
        memo[pointer] = dfs(str,pointer+1,memo);
    }
    return memo[pointer];
  };
  return dfs(str,0,memo);
};

