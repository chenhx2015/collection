// deleteProperty 方法用于拦截 delete 操作，如果这个方法抛出错误或者返回 false，当前属性就无法被 delete 命令删除
var handler = {
  deleteProperty(target, propKey) {
    invariant(propKey, "delete");
    delete target[propKey];
    return true;
  },
};
function invariant(key, action) {
  if (key[0] === "_") {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
var target = {
  _prop: "foo",
};
var proxy = new Proxy(target, handler);
delete proxy._prop; // Error: Invalid attempt to delete private "_prop" property
