// 要求设计 LazyMan 类，实现以下功能。
class LazyManClass {
  constructor(name) {
    this.name = name;
    this.queue = [];
    console.log(`Hi I am ${name}`);
    // 首次开始执行第一个
    setTimeout(() => {
      this.next()
    }, 0);
  }
  sleep(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time);
    }
    this.queue.push(fn);
    return this;
  }
  sleepFirst(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time);
    }
    this.queue.unshift(fn); // 在队列头部添加
    return this;
  }
  eat(food) {
    const fn = () => {
      console.log(`I am eating ${food}`);
      this.next();
    }
    this.queue.push(fn);
    return this;
  }
  next() {
    const fn = this.queue.shift();
    fn && fn();
  }
}

function LazyMan(name) {
  return new LazyManClass(name);
}
// 上面代码的实现方式 是推入队列和执行分开来的

// 要求实现的效果如下
// LazyMan('Tony');
// Hi I am Tony

// LazyMan('Tony').sleep(2000).eat('lunch');
// Hi I am Tony
// 等待了2秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(2000).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了2秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5000).sleep(6000).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了6秒...
// I am eating junk food

// 执行次序
// 1. 构建函数初始化，构建任务队列，调用settimeout(0)，安排异步执行任务队列。
// 2. 依次调用本行的各个函数，安排各个函数的内部函数进入任务队列，队列里有eat的内函数，sleep的内部函数，eat的内部函数
//    如果这个任务中都是同步代码，结束时调用next()，执行队列中的下一任务
//    如果这个任务包含异步任务时，如SetTimout(), 则遇到异步代码时，暂停整个任务队列的执行，让出CPU指令执行时间；
//    等到再次获得CPU执行时间时，完成剩余代码，结束时调用next，执行队列的下一任务。

// 3. 构建函数的settimeout参数中的异步代码，被触发。开始执行任务队列。
// 4. sleepFirst由题意，优先执行，因而把sleepFirst的内部任务，加入到队列头部。
// 5. sleep，sleepfirst本身需要异步执行，因此这两个函数的内部代码又加入了SetTimeout



