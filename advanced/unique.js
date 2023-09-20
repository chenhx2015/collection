// 数组去重 包括对象和数组 及其类型
// 1.数组元素为
//   传入:[123, "meili", "123", "mogu", 123]，
//   输出:[123, "meili", "123", "mogu"]
// 2.数组元素为
//   传入: [123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]，
//   输出: [123, [1, 2, 3], [1, "2", 3], "meili"]
// 3.数组元素为
//   传入: [123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]，
//   输出: [123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]

// 辅助函数 用于类型获取
var getType = (function() {
  const class2type = { '[object Boolean]': 'boolean', '[object Number]': 'number', '[object String]': 'string', '[object Function]': 'function', '[object Array]': 'array', '[object Date]': 'date', '[object RegExp]': 'regexp', '[object Object]': 'object', '[object Error]': 'error', '[object Symbol]': 'symbol' };

  return function getType(obj) {
    if (obj == null) {
        return obj + '';
    }
    const str = Object.prototype.toString.call(obj);
    return typeof obj === 'object' || typeof obj === 'function' ? class2type[str] || 'object' : typeof obj;
  };
})();

/**
 * 判断两个元素是否相等
 * 在 === 的基础上 有如下扩展规则
 * 规则1：如果是数组 则每个元素相等认为两个数组相等
 * 规则2：如果是对象 则每个键的值都相等则认为两个对象相等
 * @param {any} target 比较元素
 * @param {any} other 其他元素
 * @returns {Boolean} 是否相等
 */
function isEqual(target, other) {
  const t1 = getType(target);
  const t2 = getType(other);

  // 类型不同
  if (t1 !== t2) return false;

  if (t1 === 'array') {
    if (target.length !== other.length) return false; // 数组长度不等
    // 比较当前数组和另一个数组中的每个元素
    return target.every((item, i) => {
      // return item === target;
      return isEqual(item, other[i]);
    });
  }

  if (t2 === 'object') {
    // 对象情况类似数组 但是遍历方法区别一下
    const keysArr = Object.keys(target);
    if (keysArr.length !== Object.keys(other).length) return false;
    return keysArr.every(k => {
      return isEqual(target[k], other[k]);
    });
  }

  return target === other;
}

/**
 * 对输入数组按照指定规则进行去重
 *
 * @param {Array<any>} arr 待去重的数组
 * @returns {Array<any>} 去重后的新数组
 */
function unique(arr) {
  return arr.reduce((outputArr, current) => {
    const isUnique = !outputArr.some(item => isEqual(current, item));
    if (isUnique) {
      outputArr.push(current);
    }
    return outputArr;
  }, []);
}

let a = [123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"];
// 输出: [123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]
console.log('unique', unique(a));
// [ 123, { a: 1 }, { a: { b: 1 } }, { a: '1' }, 'meili' ]