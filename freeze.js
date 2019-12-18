// 冻结对象,除了将对象本身冻结，对象的属性也应该冻结
var constantize = obj => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === "object") {
      constantize(obj[key]);
    }
  });
};
