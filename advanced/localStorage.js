// 模拟实现一个 localStorage
// localStorage要刷新后依然存在
// 功能：增 删 改 查 过期处理
// 请注意：
// 属性有：length, 
// 方法有：setItem, getItem, removeItem, clear, 
// 思路：可以使用 Map 来实现

// 实现过期时间功能
// 存储的时候加个存储时间戳和有效期时长。取的时候判断一下
// 过期了就 remove 掉 或者是设置为nul

class MyLocalStorage {
  constructor() {
    this.obj = new Map()
  }
  length() {
    return this.obj.size;
  }
  setItem(key ,val) {
    this.obj.set(String(key), String(val));
  }
  getItem(key) {
    const stringKey = String(key);
    if(this.obj.has(key)) {
      return this.obj.get(stringKey)
    }
    return null;
  }
  removeItem(key) {
    this.obj.delete(key);
  }
  clear() {
    this.obj.clear();
  }
}

let storage = new MyLocalStorage();
storage.setItem('name', 'chxtt');
storage.setItem('hobby', 'badminton jumping');
console.log('name', storage.getItem('name')); // 'chx'
console.log('hobby', storage.getItem('hobby')); // badminton
console.log('size', storage.length()); // 2

// 方法二：还可以是使用 cookie 实现
