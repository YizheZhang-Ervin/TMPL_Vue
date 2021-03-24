// 基于Promise手写一个promise.all 

const myPromiseAll = (arr) => {
    // 判断是否为promise
    let isPromise = (obj) => {
        return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
    }
    // 需要用一个数组存放每一个promise的结果值
    let result = [];
    // 返回值是new Promise
    return new Promise((resolve, reject) => {
        // 遍历参数数组，判断是否是promise，是的话执行得到结果后压入结果数组；否则直接放入结果数组
        for (let i = 0; i < arr.length; i++) {
            if (isPromise(arr[i])) {
                arr[i].then(
                    (data) => {
                        result[i] = data;
                        // 当每个都成功执行后，resolve（result）
                        if (result.length === arr.length) {
                            resolve(result)
                        }
                        // 当有一个失败，reject
                    }
                    , reject)
            } else {
                result[i] = arr[i];
            }
        }
    })
}

// test: succeed
let test1 = () => {
    let p1 = Promise.resolve(3);
    let p2 = 1337;
    let p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, 'foo');
    });
    myPromiseAll([p1, p2, p3]).then(values => {
        console.log(values); // [3, 1337, "foo"] 
    });
}
// test1();

// test: fail
let test2 = () => {
    let p1 = new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, 'one');
    });
    let p2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, 'two');
    });
    let p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 3000, 'three');
    });
    let p4 = new Promise((resolve, reject) => {
        setTimeout(resolve, 4000, 'four');
    });
    let p5 = new Promise((resolve, reject) => {
        reject('reject');
    });

    myPromiseAll([p1, p2, p3, p4, p5]).then(values => {
        console.log(values);
    }, reason => {
        console.log(reason);// reject
    });
}
test2();
