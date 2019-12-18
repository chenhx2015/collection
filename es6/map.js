// Map : Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现
// Object 结构提供了“字符串—值”的对应

const m = new Map();
const o = {
  p: "Hello world"
};

m.set(o, "content");
console.log({ m }); // { m: Map { { p: 'Hello world' } => 'content' } }
let mo = m.get(o);
console.log({ mo }); // { mo: 'content' }
