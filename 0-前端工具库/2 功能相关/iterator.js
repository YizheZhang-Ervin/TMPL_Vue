// Iterator遍历器实现

let addIteratorToObj = (obj) =>{
    obj[Symbol.iterator] = () => {
        let keyArr = Object.keys(obj);
        let len = keyArr.length;
        let valueArr = Object.values(obj);
        let n = 0;
        return {
            next: function () {
                if (n < len) {
                    return {
                        value: { k: keyArr[n], v: valueArr[n++] },
                        done: false
                    }
                } else {
                    return {
                        value: '',
                        done: true // done 为 true ， value 不返回
                    }
                }
            }
        }
    }
}

// test
let obj = {
    a: 100,
    b: 200
}

addIteratorToObj(obj);

for (let { k, v } of obj) {
    console.log(k, v)
}