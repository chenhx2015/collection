// 发布订阅模式 🌿🌿🌿
// 有三个角色 发布者 + 主题 + 订阅者
// 关系：
// 发布者： 增加主题 + 移除主题 + 发布某个主题的更新
// 主题：   增加订阅者 + 通知此主题所有订阅者更新数据
// 订阅者： 更新视图

// const { indexOf } = require("lodash");

// class Pub {
//   constructor() {
//     this.topics = [];
//   }
//   addTopics(topic) {
//     this.topics.push(topic);
//   }
//   removeTopics(topic) {
//     let index = this.topics.indexOf(topic);
//     if (index !== -1) {
//       this.topics.splice(index, 1);
//       return true;
//     } else {
//       return false;
//     }
//   }
//   publish(topic) {
//     this.topics.forEach(item => item === topic && item.notify())
//   }
// }

// class Topic {
//   constructor(callback) {
//     this.subs = [];
//     this.callback = callback;
//   }
//   addSub(sub) {
//     this.subs.push(sub);
//     return this;
//   }
//   notify() {
//     this.subs.forEach(item => item.update(this.callback))
//   }
// }

// class Sub {
//   constructor(val) {
//     this.val = val;
//   }
//   update(callback) {
//     this.val = callback(this.val);
//     console.log(this.val);
//   }
// }

// let topic1 = new Topic(item => item * item);
// topic1.addSub(new Sub(1)).addSub(new Sub(2)).addSub(new Sub(3));

// let pub = new Pub();
// pub.addTopics(topic1);

// pub.publish(topic1);

class Pub {
  constructor() {
    this.topics = []
  }
  addTopics(topic) {
    this.topics.push(topic);
  }
  remove(topic) {
    let index = this.topics.indexof(topic)
    if (index !== -1) {
      this.topics.splice(index, 1);
    }
  }
  publish(topic) {
    this.topics.forEach(item => item === topic && item.notify())
  }
}

class Topic {
  constructor(callback) {
    this.subs = []
    this.callback = callback
  }
  addSub(sub) {
    this.subs.push(sub)
    return this;
  }
  notify() {
    this.subs.forEach(item => { item.update(this.callback) })
  }
}

class Sub {
  constructor(val) {
    this.val = val
  }
  update(callback) {
    this.val = callback(this.val);
    console.log(this.val)
  }
}

let topic1 = new Topic(item => item * item);
topic1.addSub(new Sub(1)).addSub(new Sub(2)).addSub(new Sub(3));

let pub = new Pub();
pub.addTopics(topic1);

pub.publish(topic1);