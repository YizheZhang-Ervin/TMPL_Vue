function flatten0(arr,rst){
    for(var i=0;i<arr.length;i++){
        var data = arr[i];
        if(typeof data === 'number'){
            rst.push(data);
        }else{
            flatten0(data,rst);
        }
    }
}

function flatten1(arr){
    let result = [];
    arr.forEach(element => {
        if(Array.isArray(element)){
            result = result.concat(flatten1(element));
        }else{
            result = result.concat(element);
        }
    });
    return result;
}

function flatten2(arr){
    let result = [...arr];
    // array里面只要存在array
    while(result.some(item=>Array.isArray(item))){
        // 就把array展开并
        result = [].concat(...result);
    }
    return result;
}

// 只能扁平一层
function flatten3(arr){
    return arr.flat();
}

function flatten4(arr){
    return arr.toString().split(",").map(item=>{
        return Number(item);
    })
}

function flatten5(arr){
    return JSON.stringify(arr).replace(/(\[|\])/g,"").split(",").map(item=>Number(item));
}

function flatten6(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr = [].concat(...arr);
    }
    return arr;
}

function flatten7(){
    let result = [];
    let fn = (arr)=>{
        // 循环每一项，把不是数组的存储到新数组中
        for(let i=0;i<arr.length;i++){
            let item = arr[i];
            if(Array.isArray(item)){
                fn(item);
                continue;
            }
            result.push(item);
        }
    };
    fn(this);
    return result;
}
Array.prototype.myFlat = flatten7;

// test
const arr = [1,2,[3,4,[5,6]]];
const result0 = [];
flatten0(arr,result0);
const result1 = flatten1(arr);
const result2 = flatten2(arr);
const result3 = flatten3(arr);
const result4 = flatten4(arr);
const result5 = flatten5(arr);
const result6 = flatten6(arr);
const result7 = arr.myFlat();
console.log(result0);
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
console.log(result6);
console.log(result7);