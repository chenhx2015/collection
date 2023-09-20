// 把数组排成最小的数
// 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，
// 打印能拼接出的所有数字中最小的一个。

// 示例 1:
// 输入: [10,2]
// 输出: "102"

// 示例 2:
// 输入: [3,30,34,5,9]
// 输出: "3033459"

// 思路:
// 本题关键点是制定排序规则，设计比较器；
// 排序规则如下：
// 若ab > ba 则 a > b，
// 若ab < ba 则 a < b，
// 若ab = ba 则 a = b；
// 例如：比较3和31时，'331' > '313'，所以返回结果是'3' > '31'。
// 根据指定排序规则对数组进行排序，然后从小到大拼接即为所求结果。

function Comparator(a, b) {
  var s1 = a + "" + b;
  var s2 = b + "" + a;
  for (var i = 0; i < s1.length; i++) {
    if (s1.charAt(i) > s2.charAt(i)) {
      return 1;
    }
    if (s1.charAt(i) < s2.charAt(i)) {
      return -1;
    }
  }
  return 1;
}

function PrintMinNumber(numbers) {
  numbers.sort(Comparator);
  var result = "";
  for (var i = 0; i < numbers.length; i++) {
    result = result + numbers[i];
  }
  return result;
}
