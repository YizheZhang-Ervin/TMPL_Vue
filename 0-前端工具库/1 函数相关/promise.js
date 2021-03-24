// 实现promise
class IPromise {
    // Promise三种状态
    static PENDING = 'PENDING';
    static FULFILED = 'FULFILED';
    static REJECTED = 'REJECTED';

    constructor(callback) {
        // 容错处理
        if (typeof callback !== 'function') {
            throw new TypeError('Promise resolver undefined is not a function')
        }

        // 初始状态
        this.promiseStatus = IPromise.PENDING;

        // 定义resolve函数队列 reject函数队列
        this.resolveQueues = [];
        this.rejectQueues = [];

        //定义初始值
        this.value;

        //调用callback函数
        callback(this._resolve.bind(this), this._reject.bind(this))
    }
    _resolve(val) {
        window.addEventListener('message', () => {
            // 更改成功状态
            if (this.promiseStatus !== IPromise.PENDING) return;
            this.promiseStatus = IPromise.FULFILED;
            this.value = val;
            let handler;
            while (handler = this.resolveQueues.shift()) {
                handler(this.value)
            }
        })
        window.postMessage('')
    }
    _reject(val) {
        window.addEventListener('message', () => {
            // 更改失败状态
            if (this.promiseStatus !== IPromise.PENDING) return;
            this.promiseStatus = IPromise.REJECTED;
            this.value = val;
            let handler;
            while (handler = this.rejectQueues.shift()) {
                handler(this.value)
            }
        })
        window.postMessage('')
    }
    then(resolveHandler, rejectHandler) {
        return new IPromise((resolve, reject) => {
            function newResolveHandler(val) {
                // 首先判断 resolveHandler是否是一个函数
                if (typeof resolveHandler === 'function') {
                    /*
                     获取resolveHandler 函数的返回值进行判断
                     如果是promise则继续.then，不是则直接将结果返回
                     */
                    let result = resolveHandler(val);
                    if (result instanceof IPromise) {
                        result.then(resolve, reject)
                    } else {
                        resolve(result);
                    }

                } else {
                    resolve(val);
                }

            }

            function newRejectHandler(val) {
                if (typeof rejectHandler === 'function') {
                    let result = rejectHandler(val);
                    if (result instanceof IPromise) {
                        result.then(resolve, reject)
                    } else {
                        reject(result);
                    }

                } else {
                    reject(val);
                }

            }
            this.resolveQueues.push(newResolveHandler);
            this.rejectQueues.push(newRejectHandler);
        })
    }
    catch(rejectHandler) {
        return this.then(undefined, rejectHandler);
    }
    static all(iterator) {
        let len = iterator.length;
        let n = 0;
        let vals = [];
        return new IPromise((resolve, reject) => {
            iterator.forEach((item) => {
                item.then((val) => {
                    ++n;
                    vals.push(val);
                    if (len === n) {
                        resolve(vals);
                    }
                }).catch((e) => {
                    reject(e);
                })
            })
        })
    }
    static race(iterator) {
        return new IPromise((resolve, reject) => {
            iterator.forEach((item) => {
                item.then((val) => {
                    resolve(val);
                }).catch((e) => {
                    reject(e);
                })
            })
        })
    }
    static resolve(val) {
        return new IPromise((resolve) => {
            resolve(val)
        })
    }
    static reject(val) {
        return new IPromise((resolve, reject) => {
            reject(val)
        })
    }
}

// test
var p = new IPromise(function (res, rej) {
    var timeOut = Math.floor(Math.random() * 2);
    console.log(timeOut)
    setTimeout(function () {
        timeOut && (rej('超时了......'), 1) || res('200');
    }, timeOut * 500);
}).then(function (res) {
    console.log(res);
}).catch(function (err) {
    console.log(err);
});