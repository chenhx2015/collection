// 扑克牌中的顺子
// 从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这5张牌是不是连续的。
// 2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，
// 可以看成任意数字。A 不能视为 14。

// 示例 1:
// 输入: [1,2,3,4,5]
// 输出: True
 
// 示例 2:
// 输入: [0,0,1,2,5]
// 输出: True

// 思路
// 1.数组排序 排序时应使用numbers.sort((a, b) => a - b);，
// 直接numbers.sort（）将不对最后一个元素进行排序
// 2.遍历数组
// 3.若为 0，记录 0 的个数加1
// 4.若不为 0，记录和下一个元素的间隔
// 5.最后比较 0 的个数和间隔数，间隔数 > 0 的个数则不能构成顺子
// 6.注意中间如果有两个元素相等则不能构成顺子

var isStraight = function (numbers) {
  if (numbers && numbers.length > 0) {
    numbers.sort((a, b) => a - b); // 从小到大排序
    let kingNum = 0;
    let spaceNum = 0;
    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] === 0) {
        kingNum++;
      } else {
        // 间距
        const space = numbers[i + 1] - numbers[i];
        // 如果存在相同数字，直接返回false
        if (space == 0) {
          return false;
        } else {
          // 间距总和+=space-1
          spaceNum += space - 1;
        }
      }
    }
    //0的数量刚好能抵消间距 则true；注意：关注这个规则
    return kingNum - spaceNum >= 0;
  }
  return false;
}
