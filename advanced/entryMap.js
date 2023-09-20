// entry 格式转换 及互换
let entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}

// 要求转换成如下对象
// var output = {
//   'a.b.c.dd': 'abcdd',
//   'a.d.xx': 'adxx',
//   'a.e': 'ae'
// }

// 注意：此处的处理方式为 第二个参数和第三个参数的处理，
// 之前没想到，只使用了第一个参数
function entryMap(obj, prevKey='', output={}) {
  let keysArr = Object.keys(obj);
  for(let i = 0; i < keysArr.length; i++) {
    let keyName = `${prevKey}${keysArr[i]}`;
    if(Object.prototype.toString.call(obj[keysArr[i]]) === '[object Object]') {
      entryMap(obj[keysArr[i]], `${keyName}.`, output)
    } else {
      output[keyName] = obj[keysArr[i]]
    }
  }
  return output;
}

let exc = entryMap(entry);
console.log('entryMap', exc);
