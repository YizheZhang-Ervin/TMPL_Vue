// 终止前一个promise，或者阻止其回调执行

function getWithCancel(promise, obj) {
    Promise.race([
        promise, 
        new Promise(
            (_, reject) => {
                obj.cancel = function () {
                    reject(new Error('cancel'))
                }
            })
        ])
        .catch((e) => console.log(e));
};

// test
let obj = {};
let p = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve("123");
    }, 3000);
});
getWithCancel(p, obj);
obj.cancel();