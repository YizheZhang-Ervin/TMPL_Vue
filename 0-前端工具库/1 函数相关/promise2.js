const STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}
const emptyObj = {};

function handleFun(fun, resolve, reject) {
    try {
        fun(resolve, reject);
    } catch (err) {
        reject(err);
    }
}
function getFun(fun) {
    return typeof fun === 'function' ? fun : function(e) {return e};
}

function PromiseFun(fu) {
    if(fu === emptyObj) return;
    this.defaultState = STATE.PENDING;
    this.state = STATE.PENDING;
    this.data = 0;
    this.onFulfilledList = [];
    this.onRejectedList = [];

    const resolve = (val) => {
        if(this.state !== STATE.PENDING) return;
        this.state = STATE.PENDING;
        this.data = val;
        this.onFulfilledList.forEach(fun => {
            fun(val);
        })
    }
    const reject = (reason) => {
        if(this.state !== STATE.PENDING) return;
        this.state = STATE.REJECTED;
        this.onRejectedList.forEach(fun => {
            fun(reason);
        })
    }
    handleFun(resolve, reject);
} 

PromiseFun.prototype.then = function(onFulfilled, onRejected) {
    let self = this;
    onFulfilled = getFun(onFulfilled);
    onRejected = getFun(onRejected);
    switch(this.state) {
        case STATE.PENDING:
            let fun_pending = function(resolve, rejected) {
                self.onFulfilledList.push(function(val) {
                    try {
                        let data = onFulfilled(self.data);
                        if(data instanceof PromiseFun) {
                            data.then(resolve, reject);
                        } else {
                            resolve(data);
                        }
                    } catch (err) {
                        reject(err);
                    }
                })
                self.onRejectedList.push(function(val) {
                    try {
                        let data = onRejected(self.data);
                        if(data instanceof PromiseFun) {
                            data.then(resolve, reject);
                        } else {
                            reject(data)
                        }
                    } catch (err) {
                        reject(err);
                    }
                })
            }
            return new PromiseFun(fun_pending);
        case STATE.FULFILLED:
            let fun_fulfilled = function(resolve, reject) {
                try {
                    let data = onFulfilled(self.data);
                    if(data instanceof PromiseFun) {
                        data.then(resolve, reject);
                    }else {
                        resolve(data);
                    }
                } catch (err) {
                    reject(err);
                }
            }
            return new PromiseFun(fun_fulfilled);
        case  STATE.REJECTED:
            let fun_rejected = function(resolve, reject) {
                try {
                    let data = onRejected(self.data);
                    if(data instanceof PromiseFun) {
                        data.then(resolve, reject);
                    }else {
                        reject(data);
                    }
                } catch(err) {
                    reject(err);
                }
            }  
            return new PromiseFun(fun_rejected); 
    }
}

PromiseFun.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}

PromiseFun.resolve = function(value) {
    return new PromiseFun(function(resolve, rejected) {
        resolve(value);
    }) 
}

PromiseFun.reject = function(reason) {
    return new PromiseFun(function(resolve, rejected) {
        rejected(reason);
    })
}

PromiseFun.all = function(promiseArr) {
    if(!Array.isArray(promiseArr)) return;
    let len = promiseArr.length;
    let count = 0;
    let resultArr = [];
    for(let i = 0; i < len; i++) {
        let item = promiseArr[i];
        PromiseFun.resolve(item).then(function(val) {
            count++;
            resultArr[i] = val;
            if(count === len) {
                return reason(resultArr);
            }
        }, function(reason) {
            reject(reason)
        })
    }

}