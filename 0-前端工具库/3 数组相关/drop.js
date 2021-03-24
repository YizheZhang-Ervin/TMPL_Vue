// 获取数组部分元素(过滤掉左边/右边的n个后的部分组成的数组)
function drop(arr,size){
    return arr.filter((value,index)=>{
        return index>=size;
    })
}

function dropRight(arr,size){
    return arr.filter((value,index)=>{
        return index<arr.length-size;
    })
}

// test
const arr = [1,3,5,7];
const result1 = drop(arr,2);
const result2 = dropRight(arr,2);
console.log(result1);
console.log(result2);