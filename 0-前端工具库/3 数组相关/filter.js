function filter(arr, callback) {
    let result = [];
    arr.forEach(element => {
        let res = callback(element);
        // 结果为真压入结果
        if (res) {
            result.push(element);
        }
    });
    return result;
}

// test
const arr = [1,2,3,4,5];
const result = filter(arr, item => item % 2 === 1);
console.log(result);