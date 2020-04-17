// 将 ‘10000000000’，以每三位分隔展示‘10.000.000.000’，多种实现方式
// 方法一：
let str = "10000000000";
let arr = [];
for (let i = 0; i < Math.round(str.length / 3); i++) {
  arr.push(str.substring(str.length - 3 * (i + 1), str.length - i * 3));
}
arr.reverse();
let newArr = arr.join("."); // join 方法不影响原数组
console.log({ newArr });

// 方法二：字符串转数字后就可以使用toLocaleString()啦
let myNum = Number("10000000000");
let result = myNum.toLocaleString("de-DE"); // { result: '10,000,000,000' }
let result2 = result.replace(/,/g, ".");
console.log({ result2 }); // { result2: '10.000.000.000' }

// 方法三：寻找字符空隙加 .
let result3 = "10000000000".replace(/\B(?=(\d{3})+(?!\d))/g, ".");
console.log({ result3 }); // { result3: '10.000.000.000' }

// 方法四：寻找数字并在其后面加 .
let result4 = "10000000000".replace(/(\d)(?=(\d{3})+\b)/g, "$1.");
console.log({ result4 }); // { result4: '10.000.000.000' }

// 方法五：
let result5 = new Intl.NumberFormat().format(10000000000).replace(/,/g, ".");
console.log({ result5 }); // { result5: '10.000.000.000' }

// 方法六：
function foo(num) {
  const arr = [...num].reverse();
  const rst = arr.reduce((init, ele, i) => {
    i % 3 === 2 ? init.push(ele, ".") : init.push(ele);
    return init;
  }, []);
  return rst.reverse().join("");
}
let str6 = "10000000000";
let result6 = foo(str6);
console.log({ result6 }); // { result6: '10.000.000.000' }
