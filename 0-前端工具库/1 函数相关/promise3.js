// promise实现
class myPromise {
    constructor(process) {
        this.status = "pending";
        this.msg = "";
        process(this.resolve.bind(this), this.reject.bind(this));
    }
    // 执行成功
    resolve(val) {
        this.status = 'fulfilled';
        this.msg = val;
        console.log("Fulfilled: ",this.msg);
    }
    // 执行失败
    reject(err) {
        this.status = 'rejected';
        this.msg = err;
        console.log("Rejected: ",this.msg);
    }
    // 成功/失败后的操作
    then(success, fail) {
        if (this.status === 'fulfilled') {
            success(this.msg)
        }
        if (this.status === 'rejected') {
            fail(this.msg)
        }
    }
}
let p1 = new myPromise(
    (resolve, reject) => { resolve("resolve..."); }
).then(
    (successMsg) => { console.log(successMsg, "success") },
    (failMsg) => { console.log(failMsg, "fail") }
);
】