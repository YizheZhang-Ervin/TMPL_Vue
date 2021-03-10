// 去重方法
// indexOf，includes，双循环，对象键值对，Set，先排序再相邻比较

// 一次循环+一个辅助变量
function unique1(arr){
    const result = [];
    arr.forEach(item => {
        if(result.indexOf(item)===-1){
            result.push(item);
        }
    });
    return result;
}

// 一次循环+两个辅助变量
function unique2(arr){
    const result = [];
    const obj = {};
    arr.forEach(item=>{
        if(obj[item]===undefined){
            obj[item] = true;
            result.push(item);
        }
    });
    return result;
}

function unique3(arr){
    // let set = new Set(arr);
    // let arr2 = [...set];
    // return arr2;
    return [...new Set(arr)];
}

// 先排序,再相邻比较,用正则找到一样的数字的组合
function unique4(arr){
    arr.sort((a,b)=>a-b);
    let str = arr.join("@")+"@";
    let reg = /(\d+@)\1*/g;
    arr = [];
    str.replace(reg,(n,m)=>{
        m = Number(m.slice(0,m.length-1));
        arr.push(m);
    })
    return arr;
}

// test
const arr= [1,2,2,3,4];
const result1 = unique1(arr);
const result2 = unique2(arr);
const result3 = unique3(arr);
const result4 = unique4(arr);
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);