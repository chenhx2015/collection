// 实现一个 normalize 函数，能将输入的特定的字符串转化为特定的结构化数据
// 方法一：
const normalize = (str) => {
  var result = {}
  str.split(/[\[\]]/g).filter(Boolean).reduce((obj, item, index, a) => {
    obj.value = item
    if(index !== a.length -1) {
      return (obj.children = {})
    }
  }, result)
  return result
}

// 方法二：
function normalize(str) {
	let arr = str.match(/\w+/g)
	let temp = {}
	let obj
	while(arr.length) {
		let item = arr.pop()
		temp.value = item
		obj && (temp.children = obj)
		if(arr.length) {
			obj = {...temp}
			temp = {}
		}else {
			obj = temp
		}
	}
	return obj
}