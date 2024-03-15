// 🌿🌿🌿 字符串所有排列组合 🤔️ 搞不懂
// 输入一个字符串，打印出该字符串中，所有字符的排列组合
// 输入： 'abc'
// 输出： ['abc', 'acb', 'bca', 'bac', 'cab', 'cba']

/**
 * 利用回溯算法，计算所有字符串的组合
 * @param {array} list - 字符串列表
 * @param {array} result - 最终的结果
 * @param {string} current - 当前的字符串
 * @param {string} temp - 当前固定的字符
*/
// @todo 这个方法有问题，但是回溯算法可以了解一下
function stringGroup(list = [], result = [], current = "", temp = "") {
  current += temp;
  if (list.length === 0) {
    // 递归的出口，将对应结果添加到list中
    return result.push(current);
  }
  for (let i = 0; i < list.length; i++) {
    // 每次递归 固定第一个字符
    temp = list.shift();
    stringGroup(list, result, current, temp);
    // 将删除的temp重新添加到queue尾部，实现将数组反转的效果，如[a,b,c]反转为[c,b,a]
    list.push(temp);
  }
  // 这里去重是解决str中有重复的字母，比如str为'aacd'
  return [...new Set(result)];
}

let str = 'abc';
console.log('stringGroup', stringGroup(str.split())); // 

// 方法二：
function perm(s) {
  // 'abc'
  var result = [];
  if (s.length <= 1) {
    return [s];
  } else {
    // 双层 for 循环实现
    // 外层循环先找到 每次排头的那个字母
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      var newStr = s.slice(0, i) + s.slice(i + 1, s.length); // 去掉str中的c，剩下的字符按原组合赋值给newStr，长度是n-1
      // 再去递归剩余的那个 把结果拼接起来
      var l = perm(newStr); // c='a',newstr='bc' l=['bc','cb']
         
      //result=[]
      // l 就是除了排头的那个字母之外的，再进行拼接到排头字母的后面
      for (var j = 0; j < l.length; j++) {
        var tmp = c + l[j]; // 将c和l中的字符拼接 j=0, l[j]='bc' tmp='bc'
        result.push(tmp);   // result = ['abc'], 下一步, j=1,...
      }
    }
  }
  return result;
}; 

console.log('perm', perm(str)); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
