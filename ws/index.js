import Emitter from 'component-emitter';
import Backoff from 'backo2';
import { isFunction, isUndefined } from 'by-helpers';

// 这个封装的 WS 和实例时间的通信 是通过 Emitter 来的，emit 和 on 事件来发送和接收
// 因为使用 Emitter(WS.prototype)这个方法进行了包装，
// 所以封装好的 WS 可以使用 Emitter 的 emit 和 on 方法

// 整体思路：
// 1.创建实例 初始化； 
//   执行 open 方法，进行连接，考虑是否自动连接🌿，是则掉用
//   open 方法里面是 addEventListeners 方法，包含了四个 ws 方法:
//   先注意：内部状态有这几个：connected，reconnecting，readyState

//   onopen： 
//     1.设置状态 readyState：'open; connected: true
//     1.setPing, 
//     2.emit 两个连接：'reconnect' 和 'connect' （需要判断是哪个）

//   onclose：
//     1.设置状态 readyState：'closed'; connecting: false；connected：false
//     2.emit 'close' 事件
//     3.执行重连 reconnect(); 用户主动关闭则不重连

//   onmessage：
//     1.根据返回值来回 ping pong
//     2.如果是返回来的是 pong 消息
//         则判断响应时间小于 3000，就 emit 'heart_back',且设置 heartError = false；再 setPing（）
//     3.如果返回来的数据有 tpoic，则 emit 这个 topic
//     4.其他情况则直接 emit 'data' 和 emit 'message',并且带上数据

//   onerror：
//     1.设置状态 readyState：'closed'
//     2.emit 'error' 事件
//     3.执行 onclose 关闭掉

// 2.重连 ：reconnect，考虑是否自动重连🌿
//   有最大重连数 reconnectionAttempts
//   间隔时间 reconnectionDelay
//   最大间隔时间 reconnectionDelayMax
//   1.先判断是否正在连接 reconnecting 或者跳过连接 skipReconect
//   2.判断是否超过最大重连次数
//   3. 如果超过最大重连次数：
//      i：清除心跳定时器
//      ii：设置状态 reconnecting： false
//      iii：执行 close方法；clearUp()；backoff.reset()
//      iv：emit 'reconnect_failed'
//   4.如果没有超过最大重连次数：
//      i：获取 delay 用于定时器；设置状态 reconnecting： true
//      ii：如果跳过连接 skipReconect：true； 则 return
//      iii：emit 'reconnect_attempt' 和 'reconnecting'
//      iv: 如果尝试重连的次数大于设置的阈值，则 emit ‘reconnect_report’ 上报
//      vi: 执行 open() 方法

// 3.设置心跳机制和心跳检测 setPing：
//   设置定时器来不断的执行 ping 和 onHeartbeat ，这个定时器用的是 pingInterval 时间间隔 15000
//     ping：发送 ping 消息，例如 this.send({ op: 'ping', args: [new Date().getTime()] });
//     onHeartbeat: 定时器检测心跳；这个定时器用的是 pingTimeout 3000s

// 4.考虑是否自动连接；是否自动重连

Emitter(WebSocket.prototype);
/* eslint-disable */
class WS {
  constructor(uri, opts = {}) {
    // if (uri && (typeof uri === 'object')) {
    //   opts = uri;
    //   uri = opts.uri;
    // }
    // this.opts = opts;
    const {
      debug,
      closeCode,
      autoConnect = true,
      reconnectionAttempts,
      reconnectionDelay,
      reconnectionDelayMax,
      reconnectionReportThreshold,
      reconnectionReportInterval,
      reconnectionReportMax,
      randomizationFactor,
      timeout,
      reconnection,
      protocols,
    } = opts;

    // 可设置变量
    this.closeCode = isUndefined(closeCode) ? [1000] : (Array.isArray(closeCode) ? closeCode : [closeCode]);
    this.uri = uri;
    this.protocols = protocols;
    this.debug = debug || false;
    this.autoConnect = autoConnect; // 是否自动连接
    this.reconnection = reconnection !== false; // 是否自动重连，默认true
    this.reconnectionReportThreshold = reconnectionReportThreshold || 3;
    this.reconnectionReportInterval = reconnectionReportInterval || 3;
    this.reconnectionReportMax = reconnectionReportMax || 22;
    this.reconnectionAttempts(reconnectionAttempts || Infinity); // 最大重连次数
    this.reconnectionDelay(reconnectionDelay || 1000); // 间隔时间
    this.reconnectionDelayMax(reconnectionDelayMax || 5000); // 最大间隔时间
    this.randomizationFactor(randomizationFactor || 0.5); // 间隔随机增长数
    this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor(),
    });
    this.timeout(timeout || 10000); // 超时时间设置 ms

    // 内部变量
    this.engine = null; // websocket
    this.connected = false; // 是否已连接
    this.readyState = 'closed'; // 当前状态 'open', 'opening', 'closed', 'closed_user'
    this.reconnecting = false; // 正在重连
    this.skipReconect = false;
    this.pingIntervalTimer = null; // ping timer
    this.pingTimeoutTimer = null; // ping timeout Timer
    this.heartError = false;
    // note: m站心跳机制
    this.pingInterval = 15000;
    this.pingTimeout = 3000;
    this.ev = []; // 内部事件订阅
    // this.subs = []; // 订阅topic数组
    // this.topicArr = []; // 订阅topic 数组
    // 需要自动连接，则调用open()
    this.connectStart = new Date().getTime();
    this.openStart = null;
    if (this.autoConnect) this.open();
    if (this.debug) console.log('%c[socket]', 'color: #49c9c9;', '创建 socket 实例');
  }

  changeUrl(uri) {
    this.uri = uri;
  }

  getUrl() {
    const { uri } = this;
    return isFunction(uri) ? uri() : uri;
  }

  open() {
    this.openStart = new Date().getTime();
    // const self = this;
    if (this.debug) console.log('%c[socket]', 'color: #49c9c9;', 'open 开始状态:', this.readyState, '连接地址：', this.getUrl());
    if (~this.readyState.indexOf('open')) return;
    try {
      // 2021-11-19 safari 15.1默认开启 NSURL Session Websocket, 大包会自动分片，不支持客户端主动关闭连接，目前判断新版本加c=0 不开启压缩
      const safari =
        process.browser &&
        navigator.userAgent.toLowerCase().match(/version\/([\d.]+).*safari/);
      const encoding = safari && Number(safari[1]) >= 15.1 ? '&c=0' : '';
      const url = /\?/.test(this.getUrl())
        ? `${this.getUrl()}&timestamp=${new Date().getTime()}${encoding}`
        : `${this.getUrl()}?timestamp=${new Date().getTime()}${encoding}`;
      // todo: 增加timestamp参数比较生硬
      this.engine = new WebSocket(url, this.protocols);
    } catch (e) {
      if (this.debug) {
        console.error('[socket]创建实例发生错误', e);
      }
      this.emit('open_error', { code: 4998, reason: e.message || e }); // report
    }
    this.readyState = 'opening';
    this.skipReconect = false;

    this.addEventListeners();
    // 添加链接超时机制，iOS 平台不会被动触发 error 事件
    if (this._timeout) {
      const timeout = this._timeout;
      if (this.debug) console.log('%c[socket]', 'color: #49c9c9;', '超时将在开始重连', timeout);
      const timer = setTimeout(() => {
        // todo onerror没有接收
        this.engine && this.engine.emit('open_timeout', { code: 4997, reason: 'open_timeout' });
        this.emit('connect_timeout', timeout);
      }, timeout);
      this.ev.push({
        destroy: () => {
          clearTimeout(timer);
        },
      });
    }
  }

  send(obj) {
    if (this.connected) {
      this.engine.send(JSON.stringify(obj));
    }
  }

  close(code = 1005) {
    this.onClose({ code, reason: 'close_by_user' });
  }

  /* private function */

  onOpen() {
    if (this.debug) console.log('%c[socket]', 'color: #49c9c9;', 'WS prototype onOpen 执行');
    this.readyState = 'open';
    this.clearEV();
    this.setPing();
    this.connected = true;
    if (this.reconnecting) {
      const attempt = this.backoff.attempts;
      this.reconnecting = false;
      this.backoff.reset();
      this.emit('reconnect', attempt);
    } else {
      this.emit('connect');
    }
  }

  onData(data) {
    const { ret_msg, topic, request, success, type, conn_id, ping, op, timestampE6, timestamp_e6 } = data;
    // 兼容现货和合约的server ping 格式
    if (ping) {
      this.send({pong: ping});
      return;
    }
    if (op === 'ping') {
      const { op, ...other } = data;
      this.send({op: 'pong', ...other});
      return;
    }
    if (ret_msg === 'pong') {
      clearTimeout(this.pingTimeoutTimer);
      const now = new Date().getTime();
      const { op, args } = request;
      const reqTime = args[0];
      if (reqTime) {
        if (now - reqTime < 3000) {
          if (this.heartError) {
            this.emit('heart_back', { code: 4995, reason: 'heart_back' });
            this.heartError = false;
          }
        }
      }
      this.setPing();
    } else if (topic) {
      this.emit(topic, { type, data: data.data, timestampE6: timestamp_e6 || timestampE6 });
    } else if (request) {
      const { op } = request;
      if (success) {
        this.emit(`${op}_success`, conn_id);
      } else {
        this.emit(`${op}_fail`, conn_id);
      }
    } else {
      this.emit('data', data);
      this.emit('message', data);
    }
  }

  onClose({ code, reason }) {
    if (this.debug) console.log('%c[socket]', 'color: #49c9c9;', 'WS prototype onClose 执行:', reason);

    this.reconnecting = false;
    this.connected = false;
    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // 1006保留code
    let c = code;
    if (c === 1006) {
      c = 4006;
    } else if (c === 1005) {
      c = 4005;
    }
    // Firefox will throw error when ws closed normally using 1001
    if (code !== 1001) this.engine.close(c);
    this.clearUp();
    this.readyState = 'closed';
    this.emit('close', { code, reason });

    // 用户主动关闭不进行重连，`closeCode` 可以自行配置，支持 `0` ，配置 `[]` 时永远重连
    if (this.closeCode.includes(code)) {
      this.skipReconect = true;
      this.reconnecting = false;
      this.readyState = 'closed_user';
      this.backoff.reset();
      if (this.debug) console.log('%c[socket]', 'color: #49c9c9;', '用户主动关闭', reason);
    } else {
      if (this.reconnection && !this.skipReconect) {
        this.reconnect();
      }
    }
  }

  onError(err) {
    if (this.debug) console.log('%c[socket]', 'color: #49c9c9;', 'onError 执行:', err);
    this.clearUp();
    this.readyState = 'closed';
    this.emit('error', err);
    this.onClose(err);
  }

  reconnect() {
    if (this.debug) console.log('%c[socket]', 'color: #49c9c9;', 'WS prototype reconnect 执行:');
    if (this.reconnecting || this.skipReconect) {
      return;
    }
    if (this.backoff.attempts > this._reconnectionAttempts) {
      if (this.debug) console.error('[socket]超过最大重连次数, 重连彻底失败');
      // clear timers
      clearTimeout(this.pingIntervalTimer);
      clearTimeout(this.pingTimeoutTimer);

      // remove
      this.engine.close();
      this.clearUp();
      this.backoff.reset();

      this.emit('reconnect_failed');
      this.reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      if (this.debug) console.log('%c[socket]', 'color: #49c9c9;', '第几次重连：', this.backoff.attempts, '等待 %dms 开始发起重连：', delay);
      this.reconnecting = true;
      const timer = setTimeout(() => {
        if (this.skipReconect) return;
        this.emit('reconnect_attempt', this.backoff.attempts); // 发送 重连次数 事件
        this.emit('reconnecting', this.backoff.attempts); // 发送事件

        if (
          this.backoff.attempts > this.reconnectionReportThreshold
          && (this.backoff.attempts % this.reconnectionReportInterval) === 0
          && this.backoff.attempts < this.reconnectionReportMax
        ) {
          this.emit('reconnect_report', this.backoff.attempts);
        }

        this.open();
      }, delay);
      // 事件组
      this.ev.push({
        destroy: () => {
          clearTimeout(timer);
        },
      });
    }
  }

  ping() {
    this.send({ op: 'ping', args: [new Date().getTime()] });
  }

  // reset ping timeout
  // 3000s 
  onHeartbeat(timeout) {
    clearTimeout(this.pingTimeoutTimer);
    this.pingTimeoutTimer = setTimeout(() => {
      if (this.readyState === 'closed') return;
      // this.onClose({ code: 4996, reason: 'ping timeout' });
      this.emit('heart_error', { code: 4996, reason: 'ping timeout' });
      this.heartError = true;
    }, timeout);
  }

  // 心跳机制
  setPing() {
    clearTimeout(this.pingIntervalTimer);
    this.pingIntervalTimer = setTimeout(() => {
      if (this.debug) console.log('%c[socket]', 'color: #49c9c9;', 'WS send ping');
      this.ping();
      this.onHeartbeat(this.pingTimeout);
    }, this.pingInterval);
  }

  addEventListeners() {
    const { engine } = this;
    if (engine) {
      engine.onopen = () => {
        this.onOpen();
      };
      engine.onclose = ({ code, reason }) => {
        this.onClose({ code, reason });
      };
      engine.onmessage = (ev) => {
        const data = JSON.parse(ev.data);
        if (Array.isArray(data)) {
          for (let i = 0, len = data.length; i < len; i += 1) {
            setTimeout(() => {
              this.onData(data[i]);
            }, 0);
          }
        } else {
          this.onData(data);
        }
        // engine.removeListener('onmessage');
      };
      engine.onerror = () => {
        this.onError({ code: 4999, reason: 'onerror' });
      };
      engine.once('open_timeout', (e) => {
        this.onError(e);
      });
    }
  }

  // 重置websocket回调函数
  clearUp() {
    if (this.debug) console.log('ws-->clearUp');
    const { engine } = this;
    engine.onopen = () => {};
    engine.onclose = () => {};
    engine.onmessage = () => {};
    engine.onerror = () => {};
    this.clearEV();
  }

  clearEV() {
    const evLength = this.ev.length;
    for (let i = 0; i < evLength; i += 1) {
      const sub = this.ev.shift();
      sub.destroy();
    }
  }
  /* eslint-disable */
  // /* eslint-disable no-underscore-dangle */
  reconnectionAttempts(v) {
    if (!arguments.length) return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  }

  reconnectionDelay(v) {
    if (!arguments.length) return this._reconnectionDelay;
    this._reconnectionDelay = v;
    this.backoff && this.backoff.setMin(v);
    return this;
  }

  reconnectionDelayMax(v) {
    if (!arguments.length) return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    this.backoff && this.backoff.setMax(v);
    return this;
  }

  randomizationFactor(v) {
    if (!arguments.length) return this._randomizationFactor;
    this._randomizationFactor = v;
    this.backoff && this.backoff.setJitter(v);
    return this;
  };

  timeout(v) {
    if (!arguments.length) return this._timeout;
    this._timeout = v;
    return this;
  }
}

Emitter(WS.prototype);

export default WS;
