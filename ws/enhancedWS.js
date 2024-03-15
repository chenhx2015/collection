// import tracing from '@/libs/newTracing'; // @todo 后续再看如何埋点
import WS from 'by-ws';
import { getToken } from './storageData';

// 整体思路
// 包含这几个功能模块： 
// 1.subscribe，unsubscribe 方法；
//   用 channels / toChannels 和 privateChannels / toPrivateChannels 数组来存放公共和私有的topic

// 2.订阅私有推送和公共推送，私有的要判断是否已连接，然后鉴权；

// 3.login 登录方法（用于私有推送未登录情况的调用）
//   并且要有登录成功和失败的处理函数

// 4.leave 取消订阅 封装方法
//   具体的如下：
//     1.off 方法移除这个 topic 对应的事件
//       this.off(topic, this.channels[topic]);
//       this.off(topic, this.privateChannels[topic]);
//     2.delete 方法删除这个 channels[topic]
//     3.如果连接了（connected）则 unsubscribe 取消订阅这个 topic
//     4.如果没有连接 则 delete toChannels[topic] / toPrivateChannels[topic]

// 5.进行初始化执行，对如下监听到的事件 设置回调函数：
//   connects 事件 -> subsToChannels
//   reconnect 事件 -> subsAllChannels
//   close 事件 -> authed 鉴权设置为false；channels / privateChannels 置空

class EnhancedWS extends WS {
  constructor(uri, opts) {
    super(uri, opts);
    // 认证相关
    this.authing = false; // 认证
    this.authed = false; // 认证通过
    // channel 相关 公共的（已消费，未消费）和私有的（已消费，未消费）
    this.channels = {}; // 公共 已消费 
    this.toChannels = {}; // 公共 未消费 
    this.privateChannels = {}; // 私有 已消费 
    this.toPrivateChannels = {}; // 私有 未消费 
    this.configListeners(); // 初始化执行
    this.socketId = ''; // 用来上报数据的，监控层面使用的
    this.main = opts.main || false;
    this.tracker = {}; // 用来存放某些独特的topic，比如用来做单独的错误上报
    this.trackTimeout = 0;
    this.timer = null;
  }

  configListeners() {
    const subsAllChannels = () => {
      // const wsot = new Date().getTime() - this.openStart;
      // 发送订阅公用channel
      const pbKeys = Object.keys(this.channels);
      if (pbKeys.length > 0) {
        this.subscribe(pbKeys);
      }
      // 发送订阅私有channel
      const pcKeys = Object.keys(this.privateChannels);
      if (pcKeys.length > 0) {
        if (!this.authed) {
          this.login(() => {
            this.subscribe(pcKeys);
          });
        } else {
          this.subscribe(pcKeys);
        }
      }
      // if (wsot <= 60000) {
      //   tracing.addRTEvent({
      //     name: 'web',
      //     observe: `${wsot}`,
      //     parms: ['path', 'WSOT'],
      //   });
      // }
      // tracing.addEvent({
      //   t: 'perf',
      //   c: 10480,
      //   r: this.socketId,
      //   d: wsot,
      // });
    };
    const subsToChannels = () => {
      // const wsfct = new Date().getTime() - this.connectStart;
      // 发送订阅公用channel
      const pbKeys = Object.keys(this.toChannels);
      if (pbKeys.length > 0) {
        this.subscribe(pbKeys);
        this.toChannels = {};
      }
      // 发送订阅私有channel
      const pcKeys = Object.keys(this.toPrivateChannels);
      if (pcKeys.length > 0) {
        if (!this.authed) {
          this.login(() => {
            this.subscribe(pcKeys);
          });
        } else {
          this.subscribe(pcKeys);
        }
        this.toPrivateChannels = {};
      }
      // if (this.main && wsfct <= 240000) {
      //   tracing.addRTEvent({
      //     name: 'web',
      //     observe: `${wsfct}`,
      //     parms: ['path', 'WSFCT'],
      //   });
      // }
      // tracing.addEvent({
      //   t: 'perf',
      //   c: 10481,
      //   r: this.socketId,
      //   d: wsfct,
      // });
    };
    this.on('connect', subsToChannels);
    this.on('reconnect', subsAllChannels);
    // this.on('close', ({ code, reason }) => {
    this.on('close', ({ code }) => {
      this.authed = false;
      if (code === 1000) {
        this.channels = {};
        this.toChannels = {};
        this.privateChannels = {};
        this.toPrivateChannels = {};
      } else {
        // tracing.addEvent({
        //   r: this.socketId,
        //   t: 'websocket',
        //   c: code,
        //   m: reason,
        // });
      }
    });
    // this.on('open_error', ({ code, reason }) => {
    //   tracing.addEvent({
    //     r: this.socketId,
    //     t: 'websocket',
    //     c: code,
    //     m: reason,
    //   });
    // });
    // this.on('heart_error', ({ code, reason }) => {
    //   tracing.addEvent({
    //     r: this.socketId,
    //     t: 'websocket',
    //     c: code,
    //     m: reason,
    //   });
    // });
    // this.on('heart_back', ({ code, reason }) => {
    //   tracing.addEvent({
    //     r: this.socketId,
    //     t: 'websocket',
    //     c: code,
    //     m: reason,
    //   });
    // });
    this.on('subscribe_success', (socketId) => {
      this.socketId = socketId;
    });
    // this.on('subscribe_fail', (socketId) => {
    //   this.socketId = socketId;
    //   tracing.addEvent({
    //     r: this.socketId,
    //     t: 'websocket',
    //     c: 4993,
    //     m: 'subscribeFail',
    //   });
    // });
  }

  subscribe(subs = []) {
    this.send({ op: 'subscribe', args: subs });
  }

  unsubscribe(unsubs = []) {
    this.send({ op: 'unsubscribe', args: unsubs });
  }

  // 公共的
  channel(topic, callback, force) {
    if (this.readyState === 'closed_user') return null;
    const has = this.channels[topic];
    // 如果当前topic没有订阅或者需要强制订阅
    if (!has || force) {
      this.channels[topic] = callback;
      this.on(topic, callback);
      if (this.connected) {
        if (has && force) {
          this.unsubscribe([topic]);
        }
        this.subscribe([topic]);
      } else {
        this.toChannels[topic] = callback;
      }
    }
    return true;
  }

  // 私有的
  private(topic, callback) {
    if (this.readyState === 'closed_user') return null;
    if (!this.privateChannels[topic]) {
      // Hijack the callback for event record
      // 这个函数主要是用来执行传入的函数，并且返回这个传入函数处理完的返回值，是个结果，
      const hijackCallback = (resp) => {
        if (topic === 'private.wallet' || topic === 'insurance.instrument') {
          this.tracker[topic] = this.tracker[topic]
            ? this.tracker[topic] + 1
            : 1;
          if (!this.trackTimeout) {
            this.trackTimeout = setTimeout(() => {
              // Object.keys(this.tracker).forEach((key) => {
              //   tracing.addEvent({
              //     r: this.socketId,
              //     t: 'websocket',
              //     c: 4800,
              //     m: `n=[${this.tracker[key]}]${key}`,
              //   });
              // });
              this.trackTimeout = 0;
              this.tracker = {};
            }, 30 * 1000);
          }
        } else {
          // tracing.addEvent({
          //   r: this.socketId,
          //   t: 'websocket',
          //   c: 4800,
          //   m: topic,
          // });
        }
        // 执行这个传进来的函数，并返回这个函数处理完的结果
        return callback(resp);
      };
      this.privateChannels[topic] = hijackCallback;
      this.on(topic, hijackCallback);

      // 先看是否建连了 再鉴权
      if (this.connected) {
        if (this.authed) {
          this.subscribe([topic]);
        } else {
          this.login(() => {
            this.subscribe([topic]);
          });
        }
      } else {
        this.toPrivateChannels[topic] = callback;
      }
    }
    return true;
  }

  // 内部方法  login
  login(cb) {
    if (this.connected) {
      if (!this.authing) {
        this.authing = true;
        this.send({ op: 'login', args: [getToken()] });
      }
      const success = () => {
        this.off('login_fail', fail);
        this.authed = true;
        this.authing = false;
        if (typeof cb === 'function') {
          cb();
        }
      };
      const fail = () => {
        // eslint-disable-next-line no-console
        console.error('login_fail');
        this.authed = false;
        this.authing = false;
        this.off('login_success', success);
      };
      this.once('login_success', success);
      this.once('login_fail', fail);
    }
  }

  // 取消订阅
  leave(topic) {
    if (this.channels[topic]) {
      this.off(topic, this.channels[topic]);
      delete this.channels[topic];
      if (this.connected) {
        this.unsubscribe([topic]);
      } else {
        delete this.toChannels[topic];
      }
    }
    if (this.privateChannels[topic]) {
      this.off(topic, this.privateChannels[topic]);
      delete this.privateChannels[topic];
      if (this.connected) {
        this.unsubscribe([topic]);
      } else {
        delete this.toPrivateChannels[topic];
      }
    }
  }

  // 正向推送
  queryUSDT(time = 5000) {
    if (this.timer) return;
    const fn = () => {
      this.send({ op: 'query', args: [] });
      this.timer = setTimeout(() => {
        fn();
      }, time);
    };
    fn();
  }
}

export default EnhancedWS;
