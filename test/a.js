// 先计算再自增
let x = 2;
let y = x++ * 2 + 1;
console.log("y", y); // 5
console.log("x", x); // 3

// 先自增再计算（把自增完之后的值放到表达式里面去计算）
x = 2;
let y2 = ++x * 2 + 1;
console.log("y2", y2); // 7
console.log("x", x); // 3

// 区别：先计算再自增 or 先自增再计算

// 扩展：react 里面 useState 的实现原理
let memorizedState = [];
let index = 0;
function useState(initialState) {
  memorizedState[index] = memorizedState[index] || initialState;
  let curretIndex = index;
  function setState(newState) {
    memorizedState[curretIndex] = newState;
  }
  return [memorizedState[index++], setState]; // 先返回当前这一项，然后指针往后挪（index++）
}

let [count, setCount] = useState(1);
let [total, setTotal] = useState(10);

let [firstName, setFirstName] = useState("chen");
let [lastName, setLastName] = useState("huaxiang");

console.log("count", count); // 1
console.log("total", total); // 10
console.log("firstName", firstName); // chen
console.log("lastName", lastName); // huaxiang
