// const 相关需要注意的点
const obj = {
  a: 1
};
obj.a = 2;
obj.b = 3;
console.log("obj", obj); // 引用数据类型可以修改

const num = 1;
num = 2;
console.log("num", num); // 基本数据类型不能修改
