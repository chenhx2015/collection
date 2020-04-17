const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(executor) {
  let self = this;
  self.status = PENDING;
  self.onFulfilled = [];
  self.onRejected = [];

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach(fn => fn());
    }
  }
  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach(fn => fn());
    }
  }
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : reason => {
          throw reason;
        };
  let self = this;
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
  });
  return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
  let self = this;
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle"));
  }
  if ((x && typeof x === "object") || typeof x === "function") {
    let used;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          y => {
            if (used) return;
            used = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (used) return;
            used = true;
            reject(r);
          }
        );
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (error) {
      if (used) return;
      used = true;
      reject(error);
    }
  } else resolve(x);
}

Promise.defer = Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
// 安装测试脚本 npm install -g promises-aplus-tests
// 那么在对应的目录执行以下命令: promises-aplus-tests promise.js
// promises-aplus-tests中共有872条测试用例

// 以下是 Promise.resolve() 的实现
Promise.resolve = function(param) {
  if (param instanceof Promise) {
    return param;
  }
  return new Promise((resolve, reject) => {
    if (param && param.then && typeof param.then === "function") {
      setTimeout(() => {
        param.then(resolve, reject);
      });
    } else {
      resolve(param);
    }
  });
};

// promise.reject() 的实现
Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

// promise.prototype.catch 的实现
// Promise.prototype.catch 用于指定出错时的回调，是特殊的then方法，catch之后，可以继续 .then
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

// promise.prototype.finally 的实现
// 不管成功还是失败，都会走到finally中,并且finally之后，还可以继续then。并且会将值原封不动的传递给后面的then.
Promise.prototype.finally = function(callback) {
  return this.then(
    value => {
      return Promise.resolve(callback()).then(() => {
        return value;
      });
    },
    err => {
      return Promise.reject(callback()).then(() => {
        throw err;
      });
    }
  );
};

// promise.all() 的实现
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let index = 0;
    let result = [];
    if (promises.length === 0) {
      resolve(result);
    } else {
      function processValue(i, data) {
        result[i] = data;
        if (++index === promises.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          data => {
            processValue(i, data);
          },
          err => {
            reject(err);
            return;
          }
        );
      }
    }
  });
};
// promise.race() 的实现
// 如果传的参数数组是空，则返回的 promise 将永远等待
// 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return;
    } else {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          data => {
            resolve(data);
            return;
          },
          err => {
            reject(err);
            return;
          }
        );
      }
    }
  });
};

module.exports = Promise;
