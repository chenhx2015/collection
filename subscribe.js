// 实现一个发布订阅模式（观察者模式）,思路如下：
// 发送消息，即通知，意味着调用订阅者对象的某个方法。故当用户订阅信息时，该订阅者需要向发布者的 subscribe() 提供它的其中一个方法
// 每个发布者对象需要具有以下成员:
// subscribers：一个数组，存储订阅者
// subscribe()：注册/订阅，将订阅者添加到 subscribers 数组中
// unsubscribe()：取消订阅。从 subscribers 数组中删除订阅者
// publish()：循环遍历 subscribers 数组中的每一个元素，并且调用它们注册时所提供的方法

class Publisher {
  // 一个数组，存储订阅者
  constructor() {
    this.subscribers = {
      any: []
    };
  }
  // 这三种方法都需要一个 type 参数。这是因为发布者可能触发多个事件（比如同时发布一本杂志和一份报纸），而订阅者可能仅选择订阅其中一种，而另外一种不订阅
  // 注册/订阅，将订阅者添加到 subscribers 数组中
  subscribe(fn, type = "any") {
    if (typeof this.subscribers[type] === "undefined") {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  }

  // 取消订阅, 从 subscribers 数组中删除订阅者
  unsubscribe(fn, type = "any") {
    let newArr = [];
    this.subscribers[type].forEach((item, i) => {
      if (item !== fn) {
        newArr.push(fn);
      }
    });
    this.subscribers[type] = newArr;
  }

  // 循环遍历 subscribers 数组中的每一个元素，并且调用它们注册时所提供的方法
  publish(args, type = "any") {
    this.subscribers[type].forEach((item, i) => {
      item(args);
    });
  }
  // 定义一个函数 makePublisher()，它接受一个对象作为参数，通过把上述通用发布者的方法复制到该对象中，从而将其转换为一个发布者
  static makePublisher(obj) {
    obj.publisher = new Publisher();
  }
}

// 实现 person 对象

var person = {
  sayHi: function(name) {
    this.publisher.publish(name);
  },
  sayAge: function(num) {
    this.publisher.publish(num, "age");
  }
};

// 将 person 构造成一个发布者
Publisher.makePublisher(person);

// 看看订阅对象 myLover，该对象有两个方法：
var myLover = {
  name: "",
  hello: function(name) {
    this.name = name;
    console.log("Hi, i am " + name + " ! Nice to meet you!");
  },
  timeOfLife: function(num) {
    console.log(
      "Hello! My name is " + this.name + " ! I am " + num + " years old!"
    );
  }
};

// person 注册 myLover（即 myLover 向 person 订阅）
person.publisher.subscribe(myLover.hello);
person.publisher.subscribe(myLover.timeOfLife, `age`);

// 即 myLover 为默认 “any” 事件提供了一个可被调用的方法，而另一个可被调用的方法则用于当 “age” 类型的事件发生时的情况。现在让我们来触发一些事件：
person.sayHi(`Jimmy`); // Hi, i am Jimmy ! Nice to meet you!
person.sayAge(24); // Hello! My name is Jimmy ! I am 24 years old!
person.sayHi(`Tom`); // Hi, i am Tom ! Nice to meet you!
person.sayAge(6); // Hello! My name is Tom ! I am 6 years old!
person.sayAge(18); // Hello! My name is Tom ! I am 18 years old!
