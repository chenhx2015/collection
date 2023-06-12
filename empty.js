// js 方法对空位的处理
// Es5
let array = [,1,,2,,3];
array = array.map((i) => ++i)  
//结果为 [,2,,3,,4],从这里可以看出 map方法跳过了empty空位

console.log([,,,]); // (3) [empty × 3]
console.log(new Array(3)); // (3) [empty × 3]
console.log([undefined, undefined, undefined]); // (3) [undefined, undefined, undefined]
console.log(0 in [undefined, undefined, undefined]); // true
console.log(0 in [,,,]); // false // in 是检查索引 此处表示 0 位置是没有值的

// 数组方法处理空数组
// ES5中 
// forEach()、for in、filter()、every()和some()都会跳过空位，
// map()会跳过空位，但会保留这个值，
// join()和toString()会将空位与undefined以及null处理成空字符串。

// forEach 忽略空位
[1, , 2].forEach(v => console.log(v)); // 1 2

// for in 忽略空位
for(let key in [1, , 2]){ console.log(key); } // 0 2

// filter 忽略空位
console.log([1, , 2].filter(v => true)); // [1, 2]

// every 忽略空位
console.log([1, , 1].every(v => v === 1)); // true

// some 忽略空位
console.log([1, , 1].some(v => v !== 1)); // false

// map 遍历时忽略空位 新数组保留空位
console.log([1, , 1].map(v => 11)); // (3) [11, empty, 11]

// join 将空位与undefined以及null视为空字符串
console.log([1, , 1, null, undefined].join("|")); // 1||1||

// toString 将空位与undefined以及null视为空字符串
console.log([1, , 1, null, undefined].toString()); // 1,,1,,

// ES6 处理
// 则是将空位转为undefined
// 例如Array.form()方法会将数组的空位转为undefined
// 扩展运算符也会将空位转为undefined，copyWithin()会连同空位一起拷贝
// for of循环也会遍历空位并将值作为undefined
// includes()、entries()、keys()、values()、find()和findIndex()等会将空位处理成undefined。

// Array.form 将空位转为undefined
console.log(Array.from([1, , 2])); // (3) [1, undefined, 2]

// ... 将空位转为undefined
console.log([...[1, , 2]]); // (3) [1, undefined, 2]

// copyWithin 将空位一并拷贝
console.log([1, , 2].copyWithin()); // (3) [1, empty, 2]

// for of 遍历空位并将值作为undefined
for(let key of [1, , 2]){ console.log(key); } // 1 undefined 2

// includes 将空位处理成undefined
console.log([, , ,].includes(undefined)); // true

// entries 将空位处理成undefined
console.log([...[1, , 2].entries()]); // [[0, 1], [1, undefined], [2, 2]]

// keys 会取出空位的索引
console.log([...[1, , 2].keys()]); // [0, 1, 2]

// values 将空位处理成undefined
console.log([...[1, , 2].values()]); // [1, undefined, 2]

// find 将空位处理成undefined
console.log([, , 1].find(v => true)); // undefined

// find 将空位处理成undefined
console.log([, , 1].findIndex(v => true)); // 0

