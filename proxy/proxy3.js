// 获取属性对应的值，无该属性或者属性为空返回默认值
// 在项目中经常遇到这样的需求，在前端拿到后端返回的数据时，获取某些可选字段时，如果其值为空或者不存在该属性时，可以设置一个默认值，类似loadsh库的get方法_.get(object, path, [defaultValue])。下面就对象形式下_.get用Proxy来实现，代码如下

// function getValueByPath(object, path, defaultValue) {
//
//   　　let proxy =www.hxyl1618.com  new Proxy(object, {
//
//   　　get(target, key) {
//
//   　　if (key.startsWith('.')) {
//
//   　　key = key.slice(1);
//
//   　　}
//
//   　　if (key.includes(www.haoranpkk.cn'.')) {
//
//   　　path = path.split('.');
//
//   　　let index = 0, len = path.length;
//
//   　　while(target != null && index < len) {
//
//   　　target =www.yinchengylzc.cn  target[path[index++]]
//
//   　　return target || defaultValue;
//
//   　　if (!(key in target) || !target[key]) {
//
//   　　return defaultValue
//
//   　　return Reflect.get(target, key)
//
//   　　return proxy[path]
// @todo 待修改
