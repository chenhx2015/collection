// 实现 EventEmitter 订阅监听模式
// EventEmitter （事件派发器）是 Node.js 的核心模块 events 中的类，
// 用于对 Node.js 中的事件进行统一管理，用 events 特定的 API 对事件进行添加、触发和移除等等，
// EventEmitter 的核心就是事件触发与事件监听器功能的封装。

// EventEmitter
class EventEmitter {
  constructor() {
    // 维护事件及监听者
    this.listeners = {}
  }
  /**
   * 注册事件监听者
   * @param {String} type 事件类型
   * @param {Function} callback 回调函数
   */
  on(type, callback) {
    if (!this.listeners[type]) {  // 如果该事件类型不存在
      this.listeners[type] = [] // 为该事件类型设置数组，存放回调函数
    }
    this.listeners[type].push(callback) // 将回调函数放入该事件类型数组
  }
  /**
   * 发布事件
   * @param {String} type 事件类型
   * @param  {...any} args 参数列表，把emit传递的参数赋给回调函数
   */
  emit(type, ...args) {
    if (this.listeners[type]) { // 如果该事件类型存在
      this.listeners[type].forEach(callback => {
        callback(...args) // 调用该事件类型数组中的每一个回调函数，并传入参数
      })
    }
  }
  /**
   * 移除某个事件的一个监听者
   * @param {String} type 事件类型
   * @param {Function} callback 回调函数
   */
  off(type, callback) {
    if (this.listeners[type]) {
      // 查询传入回调函数在该事件类型数组中的下标，并将其下标用targetIndex存储
      const targetIndex = this.listeners[type].findIndex(item => item === callback)
      if (targetIndex !== -1) { // 说明该回调函数存在于事件类型数组中
        this.listeners[type].splice(targetIndex, 1) // 删除该回调函数
      }
      if (this.listeners[type].length === 0) { // 该事件类型数组为空
        delete this.listeners[type] // 删除该事件类型
      }
    }
  }
  /**
   * 移除某个事件的所有监听者
   * @param {String} type 事件类型
   */
  offAll(type) {
    if (this.listeners[type]) { // 如果该事件类型数组存在
      delete this.listeners[type] // 直接删除该事件类型
    }
  }
}

// usage

// 创建事件管理器实例
const ee = new EventEmitter()

// 注册一个imagine事件监听者
ee.on('imagine', function() { console.log('前端收割机') })

// 发布事件imagine
ee.emit('imagine')
// 前端收割机

// 也可以emit传递参数
ee.on('imagine', function(name,address) { console.log(`大家好，我是${name},我来自${address}！`) })
ee.emit('imagine', '前端收割机','广东') // 此时会打印两条信息，因为前面注册了两个imagine事件的监听者
// 前端收割机
// 大家好，我是前端收割机，我来自广东！

// 测试移除事件监听
const BeRemovedListener = function() { console.log('我是一个可以被移除的监听者') }

// 注册一个TestOff事件监听者
ee.on('TestOff', BeRemovedListener)

// 发布事件TestOff
ee.emit('TestOff')
// 我是一个可以被移除的监听者

// 移除事件监听
ee.off('TestOff', BeRemovedListener)
ee.emit('TestOff') // 此时事件监听已经被移除，不会再有console.log打印出来了

// 测试移除imagine的所有事件监听
ee.offAll('imagine')
console.log(ee) // 此时可以看到 ee.listeners 已经变成空对象了，再emit发送imagine事件也不会有反应了

// 发布订阅模式实现看 publish-subs.js 文件
