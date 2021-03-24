// 有一个满足就返回true

function some(arr,callback){
    for(let i=0;i<arr.length;i++){
        if(callback(arr[i],i)){
            return true;
        }
    };
    return false;
}

// test
const arr = [1,2,3,4,5];
const result = some(arr,item=>{
    return item>2;
});
console.log(result);