// 删除数组元素
function pull(arr,...args){
    // element need deleted 
    const result = [];
    for(let i=0;i<arr.length;i++){
        if(args.includes(arr[i])){
            result.push(arr[i]);
            arr.splice(i,1);
            i--;
        }
    }
    return result;
}

function pullAll(arr,values){
    return pull(arr,...values);
}

// test
let arr = [1,3,5,3,7];
const result1 = pull(arr,2,7,3,7);
arr = [1,3,5,3,7];
const result2 = pullAll(arr,[2,7,3,7]);
console.log(result1);
console.log(result2);